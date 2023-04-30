import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FechaDialogComponent } from '../fecha-dialog/fecha-dialog.component';
import { OrdenService } from '../../services/orden.service';
import { Orden } from 'src/models/Orden';
import { Producto } from 'src/models/Producto';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  animal!: string;
  name!: string;

  tablas: any = [1, 2]
  pedidos: Orden[] = []

  constructor(
    public dialog: MatDialog,
    private ordenService: OrdenService,
    private snackBar: MatSnackBar,
  ) {
    this.listarPedidos()
  }

  listarPedidos() {
    this.ordenService.getPedidos().subscribe((resp: Orden[]) => {
      this.pedidos = resp;
    })
  }

  totalOrden(productos: Producto[]) {
    let total: number = 0;
    productos.forEach(element => {
      total += element.precio * (element.unidadesCompra || 1);
    });
    return total;
  }

  entregarPedido(orden: Orden) {
    this.ordenService.entregarPedido(orden).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Se entrego el pedido", "X")
        this.listarPedidos()
      } else {
        this.openSnackBar("No se pudo entregar el pedido", "X")
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FechaDialogComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


}
