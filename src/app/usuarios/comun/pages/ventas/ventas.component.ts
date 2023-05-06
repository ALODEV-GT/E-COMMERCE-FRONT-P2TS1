import { Component } from '@angular/core';
import { Producto } from 'src/models/Producto';
import { ProductoService } from '../../services/producto.service';
import { FechaGlobalService } from 'src/app/services/fecha-global.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  productos: Producto[] = []

  //Paginacion
  public page!: number;

  constructor(
    private productoService: ProductoService,
    private fechaGlobalService: FechaGlobalService
  ) {
    this.listarProductos()
  }

  listarProductos() {
    this.productoService.getMisProductosVendidos().subscribe((resp: Producto[]) => {
      this.productos = resp;
      this.productos.forEach(element => {
        this.productoService.getImgProducto(element.imagen).subscribe((res) => {
          this.productoService.createImageFromBlob(res, element)
        })
      });
      this.formatearFechas(this.productos)
    })
  }

  formatearFechas(productos: Producto[]) {
    productos.forEach(producto => {
      producto.fechaCompra = this.fechaGlobalService.convertirFechaFormatoDDMMYYY(producto.fechaCompra!)
    });
  }



}
