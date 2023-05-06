import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../admin/services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/models/Usuario';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {
    this.miFormulario.controls["tipoCuenta"].disable();
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: [this.authenticationService.getUsuarioAutenticado()?.nombre, [Validators.required, Validators.minLength(5)],],
    usuario: [this.authenticationService.getUsuarioAutenticado()?.usuario, [Validators.required, Validators.minLength(4)],],
    contrasena: [this.authenticationService.getUsuarioAutenticado()?.contrasena, [Validators.required, Validators.minLength(5)]],
    tipoCuenta: [this.authenticationService.getUsuarioAutenticado()?.rol, Validators.required],
  },
  )

  ngOnInit(): void {
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

    if (this.authenticationService.getUsuarioAutenticado()?.usuario == usuario) {
      this.actualizarUsuario(updUsuario, this.authenticationService.getUsuarioAutenticado()?.usuario || "undefined");
    } else {
      this.usuariosService.getUsuario(usuario).subscribe((resp: Usuario) => {
        if (resp) {
          this.openSnackBar("Este usuario ya existe", "X")
          return;
        } else {
          this.actualizarUsuario(updUsuario, this.authenticationService.getUsuarioAutenticado()?.usuario || "undefined");
        }
      })

    }

  }

  actualizarUsuario(updUsuario: Usuario, usuarioActual: string) {
    this.usuariosService.actualizarUsuario(updUsuario, usuarioActual).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Cambios guardados", "X")
      } else {
        this.openSnackBar("No se realizo ningun cambio", "X")
      }
    });
  }

  campoEsValido(control: string) {
    return this.miFormulario.controls[control].errors && this.miFormulario.controls[control].touched;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
