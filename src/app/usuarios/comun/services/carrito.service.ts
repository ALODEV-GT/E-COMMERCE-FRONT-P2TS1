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

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private baseUrl: string = "http://localhost:3000/api/carrito/";

  productos: Producto[] = []

  usuarioAutenticado: Usuario | undefined;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
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
    this.ponerFechaCompraProductos(new Date(Date.now()).toString());
    const ganancia: Ganancia = new Ganancia(total * 0.95, total - total * 0.95);
    const orden: Orden = new Orden(this.usuarioAutenticado!.usuario, new Date(Date.now()).toString(), new Date(Date.now()).toString(), "pendiente", this.productos, ganancia);
    return this.http.post<boolean>(`${this.baseUrl}comprar`, orden)
  }

  ponerFechaCompraProductos(fechaCompra: String) {
    this.productos.forEach(prod => {
      prod.fechaCompra = fechaCompra;
    });
  }

  getTarjetasUsuario(): Observable<Tarjeta[]> {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    return this.http.get<Tarjeta[]>(`${this.baseUrl}tarjetas/${this.usuarioAutenticado?.usuario}`)
  }

  total(): number {
    let total: number = 0;
    this.productos.forEach(producto => {
      total += producto.precio;
    })
    return total;
  }
}
