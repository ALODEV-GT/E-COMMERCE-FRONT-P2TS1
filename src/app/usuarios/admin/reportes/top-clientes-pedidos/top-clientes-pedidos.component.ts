import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-clientes-pedidos',
  templateUrl: './top-clientes-pedidos.component.html',
  styleUrls: ['./top-clientes-pedidos.component.css']
})
export class TopClientesPedidosComponent implements OnInit {

  registros: any = [1,2,3,4,5]
  reportes: any = [1,2,3,4,5]
  
  constructor() { }

  ngOnInit(): void {
  }

}
