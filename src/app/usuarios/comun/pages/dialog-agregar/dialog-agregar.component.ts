import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/usuarios/paqueteria/pages/pedidos/pedidos.component';
import { AuthenticationService } from '../../../../authentication/services/authentication.service';
import { ProductoService } from '../../services/producto.service';
import { Usuario } from 'src/models/Usuario';
import { Producto } from 'src/models/Producto';
import { Solicitud } from 'src/models/Solicitud';


@Component({
  selector: 'app-dialog-agregar',
  templateUrl: './dialog-agregar.component.html',
  styleUrls: ['./dialog-agregar.component.css']
})
export class DialogAgregarComponent implements OnInit {

  categorias: string[] = ["tecnologia", "hogar", "academico", "literatura", "decoracion", "otros"];

  usuarioAutenticado!: Usuario | undefined;

  ngOnInit(): void {
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<DialogAgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
  }


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)],],
    descripcion: ['', [Validators.required, Validators.minLength(5)],],
    precio: ['', [Validators.required, Validators.minLength(1)]],
    categoria: [this.categorias[this.categorias.length - 1], Validators.required],
    stock: ['', [Validators.required, Validators.minLength(1)]],
  },

  )

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


  agregarProducto() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const nombre: string = this.miFormulario.get('nombre')?.value;
    const descripcion: string = this.miFormulario.get('descripcion')?.value;
    const precio: string = this.miFormulario.get('precio')?.value;
    const categoria: string = this.miFormulario.get('categoria')?.value;
    const stock: string = this.miFormulario.get('stock')?.value;

    const solicitud: Solicitud = new Solicitud(new Date(Date.now()), "pendiente");
    const nuevoProducto = new Producto("", this.usuarioAutenticado!.usuario, nombre, descripcion, "prueba.png", Number(precio), categoria, Number(stock), solicitud);

    this.productoService.agregarNuevoProducto(nuevoProducto).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Producto enviado a paqueteria", "X")
        this.onNoClick();
      } else {
        this.openSnackBar("Ocurrio un error al crear el producto", "X")
      }
    });
  }

  campoEsValido(control: string) {
    return this.miFormulario.controls[control].errors && this.miFormulario.controls[control].touched;
  }

}
