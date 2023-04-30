import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from '../../services/producto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/models/Producto';
import { Solicitud } from 'src/models/Solicitud';

@Component({
  selector: 'app-dialog-editar',
  templateUrl: './dialog-editar.component.html',
  styleUrls: ['./dialog-editar.component.css']
})
export class DialogEditarComponent {

  categorias: string[] = ["tecnologia", "hogar", "academico", "literatura", "decoracion", "otros"];


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<DialogEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
  ) {
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: [this.data.nombre, [Validators.required, Validators.minLength(5)],],
    descripcion: [this.data.descripcion, [Validators.required, Validators.minLength(5)],],
    precio: [this.data.precio, [Validators.required, Validators.minLength(1)]],
    categoria: [this.data.categoria, Validators.required],
    stock: [this.data.stock, [Validators.required, Validators.minLength(1)]],
  },

  )

  editarProducto() {
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
    const productoEditado = new Producto(this.data._id, "", nombre, descripcion, "prueba.png", Number(precio), categoria, Number(stock), solicitud);

    this.productoService.editarProducto(productoEditado).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Producto editado", "X")
        this.onNoClick();
      } else {
        this.openSnackBar("Ocurrio un error al crear el editar el producto", "X")
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  campoEsValido(control: string) {
    return this.miFormulario.controls[control].errors && this.miFormulario.controls[control].touched;
  }

}
