import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/models/Usuario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResUpdate } from 'src/models/ResUpdate';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl: string = "http://localhost:3000/api/usuarios/";

  constructor(private http: HttpClient) {

  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}lista`);
  }

  getUsuario(nombreUsuario: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}usuario/${nombreUsuario}`);
  }

  agregarNuevoUsuario(nuevoUsuario: Usuario): Observable<boolean> {
    return this.http.post<Usuario>(`${this.baseUrl}agregar`, nuevoUsuario).pipe(map(
      (resp) => {
        return (!resp) ? false : true;
      }
    ));
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete<Usuario>(`${this.baseUrl}eliminar/${usuario.usuario}`).pipe(map(
      (resp) => {
        return (!resp) ? false : true;
      }
    ));
  }

  actualizarUsuario(usuario: Usuario, usuarioActual: string): Observable<boolean> {
    return this.http.put<ResUpdate>(`${this.baseUrl}actualizar/${usuarioActual}`, usuario).pipe(map(
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
