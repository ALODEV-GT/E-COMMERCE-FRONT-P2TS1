import { Component, OnInit } from '@angular/core';
import { DialogAgregarComponent } from '../dialog-agregar/dialog-agregar.component';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/models/Producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent {

  productos: Producto[] = []

  constructor(
    private productoService: ProductoService,
    public dialog: MatDialog
  ) {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.getMisProductos().subscribe((resp: Producto[]) => {
      this.productos = resp;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAgregarComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarProductos();
    });
  }

}
