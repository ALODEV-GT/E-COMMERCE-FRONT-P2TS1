import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/models/Producto';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { Usuario } from 'src/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl: string = "http://localhost:3000/api/productos/";

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

  getProductos() {
    const usuario: Usuario | undefined = this.authenticationService.getUsuarioAutenticado();
    return this.http.get<Producto[]>(`${this.baseUrl}productos-venta`);
  }

  getMisProductos(): Observable<Producto[]> {
    const usuario: Usuario | undefined = this.authenticationService.getUsuarioAutenticado();
    return this.http.get<Producto[]>(`${this.baseUrl}mis-productos/${usuario?.usuario}`);
  }


}
