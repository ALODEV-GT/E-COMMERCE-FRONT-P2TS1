import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  tablas: any = [1,2,3,4,5]

  constructor() { }

  ngOnInit(): void {
  }

}
