import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-clientes-stock',
  templateUrl: './top-clientes-stock.component.html',
  styleUrls: ['./top-clientes-stock.component.css']
})
export class TopClientesStockComponent implements OnInit {

  registros: any = [1,2,3,4,5]
  reportes: any = [1,2,3,4,5]
  
  constructor() { }

  ngOnInit(): void {
  }

}
