import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/models/Producto';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rechazados',
  templateUrl: './rechazados.component.html',
  styleUrls: ['./rechazados.component.css']
})
export class RechazadosComponent {

  productos: Producto[] = []

  //Paginacion
  public page!: number;

  constructor(
    private snackBar: MatSnackBar,
    private productoService: ProductoService,
  ) {
    this.listarProductos()
  }

  listarProductos() {
    this.productoService.getMisProductosRechazados().subscribe((resp: Producto[]) => {
      this.productos = resp;
      this.productos.forEach(element => {
        this.productoService.getImgProducto(element.imagen).subscribe((res) => {
          this.productoService.createImageFromBlob(res, element)
        })
      });
    })
  }

  eliminar(producto: Producto) {
    this.productoService.eliminarProducto(producto).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Se ha eliminado el producto", "X")
        this.listarProductos()
      } else {
        this.openSnackBar("Ocurrio un error al eliminar el producto", "X")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
