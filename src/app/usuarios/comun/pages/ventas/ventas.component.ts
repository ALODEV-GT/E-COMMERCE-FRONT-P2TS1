import { Component } from '@angular/core';
import { Producto } from 'src/models/Producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  productos: Producto[] = []

  constructor(
    private productoService: ProductoService
  ) {
    this.listarProductos()
  }

  listarProductos() {
    this.productoService.getMisProductosVendidos().subscribe((resp: Producto[]) => {
      this.productos = resp;
    })
  }



}
