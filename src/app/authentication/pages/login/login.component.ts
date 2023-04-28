import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/usuarios/admin/services/usuarios.service';
import { Usuario } from 'src/models/Usuario';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {

  }

  miFormulario: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(4)],],
    contrasena: ['', [Validators.required, Validators.minLength(5)]],
  },

  )

  ingresar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      this.openSnackBar("Credenciales incorrectos", "X")
      return;
    }

    const usuario: string = this.miFormulario.get('usuario')?.value;
    const contrasena: string = this.miFormulario.get('contrasena')?.value;
    const user: Usuario = new Usuario("", usuario, contrasena, "", []);

    this.authenticationService.autenticar(user).subscribe((resp: Usuario) => {
      if (resp.rol == "ninguno") {
        this.openSnackBar("Credenciales incorrectos", "X")
      } else {
        switch (resp.rol) {
          case "comun":
            this.router.navigate(['./usuario/productos'])
            break;
          case "administrador":
            this.router.navigate(['./administrador/reportes/listado'])
            break;
          case "paqueteria":
            this.router.navigate(['./paqueteria/pedidos'])
            break;
          default:
            this.router.navigate(['./autenticacion/registro'])
            break;
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
