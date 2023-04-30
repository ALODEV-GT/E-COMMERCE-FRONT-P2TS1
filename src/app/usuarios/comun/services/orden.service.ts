import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { Orden } from 'src/models/Orden';
import { Usuario } from 'src/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private baseUrl: string = "http://localhost:3000/api/ordenes/";

  private usuarioAutenticado: Usuario | undefined;


  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  getPedidosPendientes(): Observable<Orden[]> {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    return this.http.get<Orden[]>(`${this.baseUrl}mis-pedidos-pendientes/${this.usuarioAutenticado?.usuario}`);
  }

  getPedidosEntregados(): Observable<Orden[]> {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
    return this.http.get<Orden[]>(`${this.baseUrl}mis-pedidos-entregados/${this.usuarioAutenticado?.usuario}`);
  }
}
