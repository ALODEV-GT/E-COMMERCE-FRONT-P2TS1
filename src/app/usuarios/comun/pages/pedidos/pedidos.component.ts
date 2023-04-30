import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../services/orden.service';
import { Orden } from 'src/models/Orden';
import { Producto } from 'src/models/Producto';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  tablas: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  pendidosEntregados: Orden[] = []
  pedidosPendientes: Orden[] = []

  constructor(
    private ordenService: OrdenService
  ) {
    this.listarPedidosEntregados()
    this.listarPedidosPendientes()
  }

  listarPedidosEntregados() {
    this.ordenService.getPedidosEntregados().subscribe((resp: Orden[]) => {
      this.pendidosEntregados = resp;
    })
  }

  listarPedidosPendientes() {
    this.ordenService.getPedidosPendientes().subscribe((resp: Orden[]) => {
      this.pedidosPendientes = resp;
    })
  }

  totalOrden(productos: Producto[]) {
    let total: number = 0;
    productos.forEach(element => {
      total += element.precio * (element.unidadesCompra || 1);
    });
    return total;
  }

  ngOnInit(): void {
  }

}
