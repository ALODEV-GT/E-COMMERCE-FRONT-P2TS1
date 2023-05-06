import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from 'src/models/Producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/models/Usuario';
import { AuthenticationService } from '../../../../authentication/services/authentication.service';
import { Tarjeta } from 'src/models/Tarjeta';
import { Fecha, FechaGlobalService } from '../../../../services/fecha-global.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  productos: Producto[] = []
  usuarioAutenticado: Usuario | undefined;

  tarjetas: Tarjeta[] = []

  fechaActual!: string;

  //Paginacion
  public page!: number;

  constructor(
    private carritoService: CarritoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private fechaGlobalService: FechaGlobalService
  ) {
    this.listarProductos()
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado()
    this.carritoService.getTarjetasUsuario().subscribe((resp: Tarjeta[]) => {
      this.tarjetas = resp;
    })
    this.fechaGlobalService.obtenerFecha().subscribe((resp: Fecha) => {
      this.miFormulario.controls["fecha"].setValue(this.fechaGlobalService.convertirFecha(resp.fecha));
      this.fechaActual = resp.fecha;
    })
  }

  miFormulario: FormGroup = this.fb.group({
    tarjeta: [''],
    notarjeta: [''],
    cvv: [''],
    fecha: [''],
    aleas: [''],
    guardar: [''],
  },

  )

  listarProductos() {
    this.productos = this.carritoService.getCarrito()
  }

  eliminarProducto(producto: Producto) {
    this.carritoService.eliminarProducto(producto)
  }

  eliminarCarrito() {
    this.carritoService.eliminarCarrito()
    this.listarProductos()
  }

  total() {
    let total: number = 0;
    this.productos.forEach(element => {
      total += element.precio * element.unidadesCompra!;
    });
    return total;
  }

  comprar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const tarjeta: string = this.miFormulario.get('tarjeta')?.value;
    const notarjeta: string = this.miFormulario.get('notarjeta')?.value;
    const cvv: string = this.miFormulario.get('cvv')?.value;
    const fecha: string = this.miFormulario.get('fecha')?.value;
    const aleas: string = this.miFormulario.get('aleas')?.value;
    const guardar: string = this.miFormulario.get('guardar')?.value;

    if (tarjeta) {
      if (this.carritoService.getCarrito().length == 0) {
        this.openSnackBar("No hay productos en el carrito", "X");
        return
      }

      this.carritoService.realizarCompra().subscribe((resp: boolean) => {
        if (resp) {
          this.openSnackBar("Se mando la orden", "X");
          this.miFormulario.reset()
          this.carritoService.eliminarCarrito()
          this.listarProductos()
        } else {
          this.openSnackBar("Ocurrio un error al enviar la orden", "X");
        }
      });

    } else {
      if (notarjeta.length < 8) {
        this.openSnackBar("Ingrese un numero de tarjeta valido", "X");
        return;
      }

      if (cvv.length < 3) {
        this.openSnackBar("Ingrese un numero CVV valido", "X");
        return;
      }

      if (fecha.length < 1) {
        this.openSnackBar("Ingrese una fecha de expiracion valida", "X");
        return;
      }

      if (aleas.length < 4) {
        this.openSnackBar("Ingrese un aleas mayor a 3 letras", "X");
        return;
      }

      if (this.carritoService.getCarrito().length == 0) {
        this.openSnackBar("No hay productos en el carrito", "X");
        return
      }

      this.carritoService.realizarCompra().subscribe((resp: boolean) => {
        if (resp) {
          this.openSnackBar("Se mando la orden", "X");
          this.carritoService.eliminarCarrito()
          this.miFormulario.reset()
          this.listarProductos()
        } else {
          this.openSnackBar("Ocurrio un error al enviar la orden", "X");
        }
      });

      if (guardar) {
        let nuevaTarjeta = new Tarjeta(notarjeta, cvv, fecha, aleas);

        this.carritoService.existeTarjeta(nuevaTarjeta).subscribe((resp: boolean) => {
          if (resp) { //La tarjeta ya existe
            this.openSnackBar("La tarjeta ya esta guardada", "X");
          } else { //Guardar tarjeta
            this.carritoService.guardarTarjeta(nuevaTarjeta).subscribe((resp: boolean) => {
              if (resp) {
                this.openSnackBar("Se guardo la tarjeta " + nuevaTarjeta.aleas, "X");
              } else {
                this.openSnackBar("Ocurrio un error al intentar guardar la tarjeta", "X");
              }
            })
          }
        })
      }
    }
  }

  formatearNumeroTarjeta(tarjeta: Tarjeta): string {
    const noTarjeta = tarjeta.notarjeta;
    let card = noTarjeta.slice(noTarjeta.length / 2, noTarjeta.length)
    return "xxxx-" + card;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
