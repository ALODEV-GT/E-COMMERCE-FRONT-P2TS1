import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../services/orden.service';
import { Orden } from 'src/models/Orden';
import { Producto } from 'src/models/Producto';
import { FechaGlobalService } from '../../../../services/fecha-global.service';

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
    private ordenService: OrdenService,
    private fechaGlobalService: FechaGlobalService
  ) {
    this.listarPedidosEntregados()
    this.listarPedidosPendientes()
  }

  formatearFechas(ordenes: Orden[]) {
    ordenes.forEach(orden => {
      orden.fecha_pedido = this.fechaGlobalService.convertirFechaFormatoDDMMYYY(orden.fecha_pedido)
      orden.fecha_entrega = this.fechaGlobalService.convertirFechaFormatoDDMMYYY(orden.fecha_entrega)
    });
  }

  listarPedidosEntregados() {
    this.ordenService.getPedidosEntregados().subscribe((resp: Orden[]) => {
      this.pendidosEntregados = resp;
      this.formatearFechas(this.pendidosEntregados)
    })
  }

  listarPedidosPendientes() {
    this.ordenService.getPedidosPendientes().subscribe((resp: Orden[]) => {
      this.pedidosPendientes = resp;
      this.formatearFechas(this.pedidosPendientes)
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
