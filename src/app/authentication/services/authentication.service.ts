import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) {

  }

  getUsuarios(): any {
    this.http.get<any>(`${this.baseUrl}`).subscribe( (res) => {
      console.log(res);
    });
  }


}
