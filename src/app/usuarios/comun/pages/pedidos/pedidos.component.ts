import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  tablas: any = [1,2,3,4,5,6,7,8,9,10]

  constructor() { }

  ngOnInit(): void {
  }

}
