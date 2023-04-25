import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-clientes-productos-vendidos',
  templateUrl: './top-clientes-productos-vendidos.component.html',
  styleUrls: ['./top-clientes-productos-vendidos.component.css']
})
export class TopClientesProductosVendidosComponent implements OnInit {

  registros: any = [1,2,3,4,5]
  reportes: any = [1,2,3,4,5]
  
  constructor() { }

  ngOnInit(): void {
  }

}
