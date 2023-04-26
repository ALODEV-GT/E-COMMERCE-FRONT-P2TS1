import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EdigarDialogUsuarioComponent } from '../edigar-dialog-usuario/edigar-dialog-usuario.component';
import { Usuario } from '../../../../../models/Usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NombreUsuarioValidatorService } from '../../services/nombre-usuario-validator.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  //dialog
  animal!: string

  usuarios: Usuario[] = [];
  roles: string[] = ["administrador", "paqueteria"]

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private nombreUsuarioValidator: NombreUsuarioValidatorService,
    private snackBar: MatSnackBar
  ) {
    this.listarUsuarios();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)],],
    usuario: ['', [Validators.required, Validators.minLength(4)], [this.nombreUsuarioValidator]],
    contrasena: ['', [Validators.required, Validators.minLength(5)]],
    tipoCuenta: ['', Validators.required],
  },

  )

  openDialog(usuario: Usuario): void {
    const dialogRef = this.dialog.open(EdigarDialogUsuarioComponent, {
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarUsuarios();
    });
  }

  listarUsuarios() {
    this.usuariosService.getUsuarios().subscribe((resp) => {
      this.usuarios = resp;
    });
  }

  agregarUsuario() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const nombre: string = this.miFormulario.get('nombre')?.value;
    const usuario: string = this.miFormulario.get('usuario')?.value;
    const contrasena: string = this.miFormulario.get('contrasena')?.value;
    const tipo: string = this.miFormulario.get('tipoCuenta')?.value;
    const nuevoUsuario: Usuario = new Usuario(nombre, usuario, contrasena, tipo);

    this.usuariosService.agregarNuevoUsuario(nuevoUsuario).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Usuario creado satisfactoriamente", "X")
        this.listarUsuarios()
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
      return "Debe tener almenos 5 caracteres"
    } else if (errors?.usuarioUsado) {
      return "Este nombre de usuario ya esta en uso"
    }
    return "Hola mundo";
  }

  eliminar(usuario: Usuario) {
    this.usuariosService.eliminarUsuario(usuario).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Se ha eliminado el usuario", "X")
        this.listarUsuarios()
      } else {
        this.openSnackBar("Ocurrio un error al eliminar el usuario", "X")
      }
    });
  }

}
