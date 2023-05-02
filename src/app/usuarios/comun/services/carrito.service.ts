import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/models/Producto';
import { Tarjeta } from '../../../../models/Tarjeta';
import { Usuario } from 'src/models/Usuario';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResUpdate } from 'src/models/ResUpdate';
import { Orden } from 'src/models/Orden';
import { Ganancia } from 'src/models/Ganancia';
import { FechaGlobalService } from '../../../services/fecha-global.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private baseUrl: string = "http://localhost:3000/api/carrito/";

  productos: Producto[] = []

  usuarioAutenticado: Usuario | undefined;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private fechaGlobalService: FechaGlobalService
  ) {

  }

  agregarProducto(producto: Producto) {
    this.productos.push(producto);
  }

  verificarSiExiste(producto: Producto): boolean {
    const found = this.productos.find(elemento => elemento._id == producto._id);
    if (found) {
      return true;
    } else {
      return false;
    }
  }

  getCarrito() {
    return this.productos;
  }

  eliminarCarrito() {
    this.productos = [];
  }

  eliminarProducto(producto: Producto) {
    const indice = this.productos.findIndex(element => element._id == producto._id)
    this.productos.splice(indice, 1)
  }

  existeTarjeta(tarjeta: Tarjeta): Observable<boolean> {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    return this.http.post<boolean>(`${this.baseUrl}existe-tarjeta?usuario=${this.usuarioAutenticado?.usuario}`, tarjeta);
  }

  guardarTarjeta(tarjeta: Tarjeta): Observable<boolean> {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    return this.http.post<ResUpdate>(`${this.baseUrl}agregar-tarjeta?usuario=${this.usuarioAutenticado?.usuario}`, tarjeta)
      .pipe(map((resp: ResUpdate) => {
        if (resp.modifiedCount > 0) {
          return true; //Ya existe la tarjeta, no se agrega
        } else {
          return false;
        }
      }))
  }

  realizarCompra(): Observable<boolean> {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    let total = this.total();
    let fechaActual: string = this.fechaGlobalService.fechaActual;
    this.ponerFechaCompraProductos(fechaActual);
    this.quitarImagenProductos();
    this.calcularGananciaProductos();
    const ganancia: Ganancia = new Ganancia(total * 0.95, total - total * 0.95);
    const orden: Orden = new Orden("", this.usuarioAutenticado!.usuario, fechaActual, this.sumarDias(fechaActual, 5), "pendiente", this.productos, ganancia);
    return this.http.post<boolean>(`${this.baseUrl}comprar`, orden)
  }

  ponerFechaCompraProductos(fechaCompra: string) {
    this.productos.forEach(prod => {
      prod.fechaCompra = fechaCompra;
    });
  }

  quitarImagenProductos() {
    this.productos.forEach(prod => {
      prod.imagenContenido = "";
    });
  }

  calcularGananciaProductos() {
    this.productos.forEach(prod => {
      let subtotal = prod.precio * prod.unidadesCompra!
      prod.ganancia = new Ganancia(subtotal * 0.95, subtotal - subtotal * 0.95);
    });
  }

  getTarjetasUsuario(): Observable<Tarjeta[]> {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    return this.http.get<Tarjeta[]>(`${this.baseUrl}tarjetas/${this.usuarioAutenticado?.usuario}`)
  }

  total(): number {
    let total: number = 0;
    this.productos.forEach(producto => {
      total += producto.precio * producto.unidadesCompra!;
    })
    return total;
  }

  sumarDias(fechaActual: string, dias: number): string {
    const fecha: Date = new Date(fechaActual);
    fecha.setDate(fecha.getDate() + dias)
    let nuevaFecha: string = this.fechaGlobalService.convertirFecha(fecha.toString())
    return nuevaFecha;
  }
}
