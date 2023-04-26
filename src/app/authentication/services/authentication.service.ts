import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/models/Usuario';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _usuario: Usuario | undefined; //Usuario en sesion

  private baseUrl: string = "http://localhost:3000/api/autenticacion";

  constructor(private http: HttpClient) {

  }

  autenticar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}`, usuario).pipe(
      tap(resp => {
        this._usuario = resp
        localStorage.clear();
        localStorage.setItem('autenticado', JSON.stringify(this._usuario));
      })
    );
  }


}
