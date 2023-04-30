import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ResUpdate } from 'src/models/ResUpdate';

export interface Fecha {
  fecha: string
}

@Injectable({
  providedIn: 'root'
})
export class FechaGlobalService {

  private baseUrl: string = "http://localhost:3000/api/fecha-global/";

  private _fechaActual!: string;

  constructor(private http: HttpClient) { }

  obtenerFecha() {
    return this.http.get<Fecha>(`${this.baseUrl}fecha-actual`).pipe(tap((resp) => {
      this._fechaActual = this.convertirFecha(resp.fecha)
    }));
  }

  cambiarFecha(fecha: Fecha) {
    this._fechaActual = fecha.fecha;
    return this.http.put<ResUpdate>(`${this.baseUrl}cambiar`, fecha);
  }

  public get fechaActual(): string {
    return this._fechaActual;
  }

  convertirFecha(fechaString: string) {
    const fecha: Date = new Date(fechaString);
    const year: string = fecha.getFullYear().toString();
    let month: string = (fecha.getMonth() + 1).toString();
    let day: string = (fecha.getDate() + 1).toString();

    // Agrega un cero inicial a los meses y días menores a 10
    if (Number(month) < 10) {
      month = "0" + month;
    }
    if (Number(day) < 10) {
      day = "0" + day;
    }

    return year + "-" + month + "-" + day;
  }

  convertirFechaFormatoDDMMYYY(fechaString: string) {
    const fecha: Date = new Date(fechaString);
    const year: string = fecha.getFullYear().toString();
    let month: string = (fecha.getMonth() + 1).toString();
    let day: string = (fecha.getDate() + 1).toString();

    // Agrega un cero inicial a los meses y días menores a 10
    if (Number(month) < 10) {
      month = "0" + month;
    }
    if (Number(day) < 10) {
      day = "0" + day;
    }

    return day + "/" + month + "/" + year;
  }

  convertirFechaFormatoYYYYMMDD(fechaString: string) {
    let partes: string[] = fechaString.split("/")
    return partes[2] + "-" + partes[1] + "-" + partes[0]
  }
}
