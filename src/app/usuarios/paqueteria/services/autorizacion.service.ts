import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/models/Producto';
import { ResUpdate } from 'src/models/ResUpdate';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private baseUrl: string = "http://localhost:3000/api/productos/";

  constructor(
    private http: HttpClient,
  ) { }

  getProductosAutorizar() {
    return this.http.get<Producto[]>(`${this.baseUrl}listar-autorizaciones`);
  }

  autorizarProducto(producto: Producto): Observable<boolean> {
    return this.http.put<ResUpdate>(`${this.baseUrl}autorizar`, producto).pipe(map(
      (resp: ResUpdate) => {
        if (resp.modifiedCount > 0) {
          return true;
        } else {
          return false;
        }
      }
    ));
  }
}
