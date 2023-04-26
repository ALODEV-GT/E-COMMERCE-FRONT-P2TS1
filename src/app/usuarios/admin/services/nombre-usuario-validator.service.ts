import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NombreUsuarioValidatorService implements AsyncValidator {

  private baseUrl: string = "http://localhost:3000/api/usuarios/";

  constructor(private http: HttpClient) {

  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const nombreUsuario = control.value;
    return this.http.get<any>(`${this.baseUrl}usuario/${nombreUsuario}`)
      .pipe(
        map(resp => {
          return (!resp) ? null : { usuarioUsado: true }
        })
      );
  }
}
