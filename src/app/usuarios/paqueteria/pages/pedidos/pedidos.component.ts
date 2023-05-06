import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FechaDialogComponent } from '../fecha-dialog/fecha-dialog.component';
import { OrdenService } from '../../services/orden.service';
import { Orden } from 'src/models/Orden';
import { Producto } from 'src/models/Producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FechaGlobalService } from 'src/app/services/fecha-global.service';

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

  //Paginacion
  public page!: number;

  constructor(
    public dialog: MatDialog,
    private ordenService: OrdenService,
    private snackBar: MatSnackBar,
    private fechaGlobalService: FechaGlobalService
  ) {
    this.listarPedidos()
  }

  listarPedidos() {
    this.ordenService.getPedidos().subscribe((resp: Orden[]) => {
      this.pedidos = resp;
      this.formatearFechas(this.pedidos)
    })
  }

  formatearFechas(ordenes: Orden[]) {
    ordenes.forEach(orden => {
      orden.fecha_pedido = this.fechaGlobalService.convertirFechaFormatoDDMMYYY(orden.fecha_pedido)
      orden.fecha_entrega = this.fechaGlobalService.convertirFechaFormatoDDMMYYY(orden.fecha_entrega)
    });
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

  openDialog(orden: Orden): void {
    const dialogRef = this.dialog.open(FechaDialogComponent, {
      data: orden,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPedidos()
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


}
