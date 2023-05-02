import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl: string = "http://localhost:3000/api/reportes/";

  constructor(private http: HttpClient) {

  }

  //Reporte 1
  getTopProductosVendidos(fechaInicial: string, fechaFinal: string) {
    return this.http.get<any>(`${this.baseUrl}top-productos-vendidos?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`);
  }

  //Reportes 2
  getTopClientesGanancias(fechaInicial: string, fechaFinal: string) {
    return this.http.get<any>(`${this.baseUrl}top-clientes-ganancias?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`);
  }

  //Reporte 3
  getTopClientesProductosVendidos(fechaInicial: string, fechaFinal: string) {
    return this.http.get<any>(`${this.baseUrl}top-clientes-productos-vendidos?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`);
  }

  //Reportes 4
  getTopClientesPedidos(fechaInicial: string, fechaFinal: string) {
    return this.http.get<any>(`${this.baseUrl}top-clientes-pedidos?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`);
  }

  //Reporte 5
  getTopClientesStock(fechaInicial: string, fechaFinal: string) {
    return this.http.get<any>(`${this.baseUrl}top-clientes-stock?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`);
  }






}
