import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/Usuario';
import { AuthenticationService } from '../../services/authentication.service';
import { Fecha, FechaGlobalService } from '../../../services/fecha-global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  fechaActual!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private fechaGlobalService: FechaGlobalService
  ) {
    this.fechaGlobalService.obtenerFecha().subscribe((resp: Fecha) => {
      this.miFormulario.controls["fechaActual"].setValue(this.fechaGlobalService.convertirFecha(resp.fecha));
      this.fechaActual = resp.fecha;
    })
  }

  ngOnInit(): void {

  }

  miFormulario: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(4)],],
    contrasena: ['', [Validators.required, Validators.minLength(5)]],
    fechaActual: ['', [Validators.required]]
  },

  )

  ingresar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      this.openSnackBar("Credenciales incorrectos", "X")
      return;
    }

    const fechaActual: string = this.miFormulario.get('fechaActual')?.value;
    if (this.esInvalidoFecha(this.fechaActual, fechaActual)) {
      this.openSnackBar("No puedes regresar el tiempo", "X")
      return;
    }

    const usuario: string = this.miFormulario.get('usuario')?.value;
    const contrasena: string = this.miFormulario.get('contrasena')?.value;
    const user: Usuario = new Usuario("", usuario, contrasena, "", []);

    this.authenticationService.autenticar(user).subscribe((resp: Usuario) => {
      if (resp.rol == "ninguno") {
        this.openSnackBar("Credenciales incorrectos", "X")
      } else {
        const fechaO: Fecha = {
          fecha: fechaActual,
        }
        this.fechaGlobalService.cambiarFecha(fechaO).subscribe(r => console.log("."));

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

  esInvalidoFecha(fechaActual: string, nuevaFecha: string): boolean {
    let invalido: boolean = false;
    const primeraFecha = new Date(fechaActual);
    const segundaFecha = new Date(nuevaFecha);
    if (segundaFecha < primeraFecha) {
      invalido = true;
    }
    return invalido;
  }

}
