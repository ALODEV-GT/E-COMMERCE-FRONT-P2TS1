import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-productos-vendidos',
  templateUrl: './top-productos-vendidos.component.html',
  styleUrls: ['./top-productos-vendidos.component.css']
})
export class TopProductosVendidosComponent implements OnInit {

  registros: any = [1,2,3,4,5]
  reportes: any = [1,2,3,4,5]

  constructor() { }

  ngOnInit(): void {
  }

}
