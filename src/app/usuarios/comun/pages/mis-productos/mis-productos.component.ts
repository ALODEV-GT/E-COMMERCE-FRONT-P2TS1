import { Component, OnInit } from '@angular/core';
import { DialogAgregarComponent } from '../dialog-agregar/dialog-agregar.component';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/models/Producto';
import { ProductoService } from '../../services/producto.service';
import { DialogEditarComponent } from '../dialog-editar/dialog-editar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FechaGlobalService } from 'src/app/services/fecha-global.service';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent {

  productos: Producto[] = []

  constructor(
    private productoService: ProductoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fechaGlobalService: FechaGlobalService
  ) {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.getMisProductos().subscribe((resp: Producto[]) => {
      this.productos = resp;
      this.productos.forEach(element => {
        this.productoService.getImgProducto(element.imagen).subscribe((res) => {
          this.productoService.createImageFromBlob(res, element)
        })
      });
      this.formatearFechas(this.productos)
    });
  }

  formatearFechas(productos: Producto[]) {
    productos.forEach(producto => {
      producto.solicitud.fecha_solicitud = this.fechaGlobalService.convertirFechaFormatoDDMMYYY(producto.solicitud.fecha_solicitud)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAgregarComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarProductos();
    });
  }

  openDialogEdit(producto: Producto): void {
    const dialogRef = this.dialog.open(DialogEditarComponent, {
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarProductos();
    });
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
