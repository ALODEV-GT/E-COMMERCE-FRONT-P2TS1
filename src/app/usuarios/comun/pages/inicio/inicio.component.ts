import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../authentication/services/authentication.service';
import { Usuario } from 'src/models/Usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuarioAutenticado: Usuario | undefined;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.usuarioAutenticado = this.authenticationService.getUsuarioAutenticado();
  }


  ngOnInit(): void {
  }

}
