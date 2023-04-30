import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/models/Producto';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { Usuario } from 'src/models/Usuario';
import { ResUpdate } from 'src/models/ResUpdate';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl: string = "http://localhost:3000/api/productos/";
  private usuarioAutenticado: Usuario | undefined;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  agregarNuevoProducto(nuevoProducto: Producto): Observable<boolean> {
    return this.http.post<Producto>(`${this.baseUrl}agregar`, nuevoProducto).pipe(map(
      (resp) => {
        return (!resp) ? false : true;
      }
    ));
  }

  editarProducto(productoEditado: Producto) {
    return this.http.put<ResUpdate>(`${this.baseUrl}editar`, productoEditado).pipe(map(
      (resp: ResUpdate) => {
        if (resp.modifiedCount > 0) {
          return true;
        } else {
          return false;
        }
      }
    ));
  }

  getMisProductosVendidos() {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    return this.http.get<Producto[]>(`${this.baseUrl}mis-productos-vendidos/${this.usuarioAutenticado?.usuario}`);
  }

  getProductos() {
    return this.http.get<Producto[]>(`${this.baseUrl}productos-venta`);
  }

  getMisProductos(): Observable<Producto[]> {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    return this.http.get<Producto[]>(`${this.baseUrl}mis-productos/${this.usuarioAutenticado?.usuario}`);
  }

  getMisProductosRechazados() {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    return this.http.get<Producto[]>(`${this.baseUrl}productos-rechazados/${this.usuarioAutenticado?.usuario}`);
  }

  eliminarProducto(producto: Producto) {
    return this.http.delete<Producto>(`${this.baseUrl}eliminar-producto/${producto._id}`).pipe(map(
      (resp) => {
        return (!resp) ? false : true;
      }
    ));
  }

}
