import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-clientes-ganancias',
  templateUrl: './top-clientes-ganancias.component.html',
  styleUrls: ['./top-clientes-ganancias.component.css']
})
export class TopClientesGananciasComponent implements OnInit {

  registros: any = [1, 2, 3, 4, 5]
  reportes: any = [1, 2, 3, 4, 5]

  constructor() { }

  ngOnInit(): void {
  }

}
