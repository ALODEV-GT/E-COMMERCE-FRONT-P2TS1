import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Fecha, FechaGlobalService } from 'src/app/services/fecha-global.service';
import { NombreUsuarioValidatorService } from 'src/app/usuarios/admin/services/nombre-usuario-validator.service';
import { UsuariosService } from 'src/app/usuarios/admin/services/usuarios.service';
import { Usuario } from 'src/models/Usuario';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  fechaActual!: string;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private nombreUsuarioValidator: NombreUsuarioValidatorService,
    private snackBar: MatSnackBar,
    private fechaGlobalService: FechaGlobalService,
    private authenticationService: AuthenticationService
  ) {
    this.fechaGlobalService.obtenerFecha().subscribe((resp: Fecha) => {
      this.miFormulario.controls["fechaActual"].setValue(this.fechaGlobalService.convertirFecha(resp.fecha));
      this.fechaActual = resp.fecha;
    })
  }

  ngOnInit(): void {


  }



  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)],],
    usuario: ['', [Validators.required, Validators.minLength(4)], [this.nombreUsuarioValidator]],
    contrasena: ['', [Validators.required, Validators.minLength(5)]],
    fechaActual: ['', [Validators.required]]
  },

  )

  agregarUsuario() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const fechaActual: string = this.miFormulario.get('fechaActual')?.value;
    if (this.esInvalidoFecha(this.fechaActual, fechaActual)) {
      this.openSnackBar("No puedes regresar el tiempo", "X")
      return;
    }

    const nombre: string = this.miFormulario.get('nombre')?.value;
    const usuario: string = this.miFormulario.get('usuario')?.value;
    const contrasena: string = this.miFormulario.get('contrasena')?.value;
    const tipo: string = "comun"
    const nuevoUsuario: Usuario = new Usuario(nombre, usuario, contrasena, tipo, []);

    const fechaO: Fecha = {
      fecha: fechaActual,
    }
    this.fechaGlobalService.cambiarFecha(fechaO).subscribe(r => console.log("."));

    this.usuariosService.agregarNuevoUsuario(nuevoUsuario).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Usuario creado satisfactoriamente", "X")
        this.authenticationService.cambiarAutenticado(nuevoUsuario);
        this.router.navigate(['./usuario/productos'])
      } else {
        this.openSnackBar("Ocurrio un error al crear el usuario", "X")
      }
    });

    this.miFormulario.reset();
  }

  campoEsValido(control: string) {
    return this.miFormulario.controls[control].errors && this.miFormulario.controls[control].touched;
  }

  getErrorNombre(): string {
    const errors = this.miFormulario.get('usuario')?.errors;
    if (errors?.required) {
      return "Este campo es obligatorio";
    } else if (errors?.minlength) {
      return "Debe tener almenos 4 caracteres"
    } else if (errors?.usuarioUsado) {
      return "Este nombre de usuario ya esta en uso"
    }
    return "Hola mundo";
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
