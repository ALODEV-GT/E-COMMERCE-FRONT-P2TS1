import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Orden } from 'src/models/Orden';
import { ResUpdate } from 'src/models/ResUpdate';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private baseUrl: string = "http://localhost:3000/api/ordenes/";

  constructor(
    private http: HttpClient,
  ) { }

  getPedidos(): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${this.baseUrl}pedidos-pendientes`);
  }

  entregarPedido(orden: Orden) {
    return this.http.put<ResUpdate>(`${this.baseUrl}entregar-pedido`, orden).pipe(map(
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
