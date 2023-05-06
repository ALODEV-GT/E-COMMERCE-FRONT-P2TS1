import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/models/Producto';
import { CarritoService } from '../../services/carrito.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  productos: Producto[] = []

  //Paginacion
  public page!: number;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private snackBar: MatSnackBar,
  ) {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.getProductos().subscribe((resp: Producto[]) => {
      this.productos = resp;
      this.productos.forEach(element => {
        this.productoService.getImgProducto(element.imagen).subscribe((res) => {
          this.productoService.createImageFromBlob(res, element)
        })
      });
    });
  }

  agregarAlCarrito(producto: Producto) {
    //Validaciones
    if (producto.unidadesCompra) {
      if (producto.unidadesCompra > producto.stock) {
        this.openSnackBar("No hay unidades suficientes", "X")
        return
      }
    } else {
      this.openSnackBar("Debes comprar almenos una unidad", "X")
      return
    }

    //Verificar si el producto ya existe en el carrito
    const existe: boolean = this.carritoService.verificarSiExiste(producto)
    if (existe) {
      this.openSnackBar("Este producto ya esta en el carrito", "X")
      return
    }

    //Agregar sin imagen
    this.carritoService.agregarProducto(producto);
    this.openSnackBar("Producto agregado al carrito", "X")
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
