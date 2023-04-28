import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/models/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';


interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-edigar-dialog-usuario',
  templateUrl: './edigar-dialog-usuario.component.html',
  styleUrls: ['./edigar-dialog-usuario.component.css']
})
export class EdigarDialogUsuarioComponent implements OnInit {

  ngOnInit(): void {
  }

  roles: string[] = ["administrador", "paqueteria"]

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EdigarDialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
  ) { }

  miFormulario: FormGroup = this.fb.group({
    nombre: [this.data.nombre, [Validators.required, Validators.minLength(5)],],
    usuario: [this.data.usuario, [Validators.required, Validators.minLength(4)],],
    contrasena: [this.data.contrasena, [Validators.required, Validators.minLength(5)]],
    tipoCuenta: [this.data.rol, Validators.required],
  },

  )

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  campoEsValido(control: string) {
    return this.miFormulario.controls[control].errors && this.miFormulario.controls[control].touched;
  }

  getErrorNombre(): string {
    const errors = this.miFormulario.get('usuario')?.errors;
    if (errors?.required) {
      return "Este campo es obligatorio";
    } else if (errors?.minlength) {
      return "Debe tener almenos 5 caracteres"
    } else if (errors?.usuarioUsado) {
      return "Este nombre de usuario ya esta en uso"
    }
    return "Hola mundo";
  }

  editarUsuario() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const nombre: string = this.miFormulario.get('nombre')?.value;
    const usuario: string = this.miFormulario.get('usuario')?.value;
    const contrasena: string = this.miFormulario.get('contrasena')?.value;
    const tipo: string = this.miFormulario.get('tipoCuenta')?.value;
    const updUsuario: Usuario = new Usuario(nombre, usuario, contrasena, tipo, []);

    if (this.data.usuario == usuario) {
      this.actualizarUsuario(updUsuario, this.data.usuario);
    } else {
      this.usuariosService.getUsuario(usuario).subscribe((resp: Usuario) => {
        if (resp) {
          this.openSnackBar("Este usuario ya existe", "X")
          return;
        } else {
          this.actualizarUsuario(updUsuario, this.data.usuario);
        }
      })

    }

  }

  actualizarUsuario(updUsuario: Usuario, usuarioActual: string) {
    this.usuariosService.actualizarUsuario(updUsuario, usuarioActual).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Cambios guardados", "X")
        this.onNoClick()
      } else {
        this.openSnackBar("No se realizo ningun cambio", "X")
        this.onNoClick()
      }
    });
  }

}
