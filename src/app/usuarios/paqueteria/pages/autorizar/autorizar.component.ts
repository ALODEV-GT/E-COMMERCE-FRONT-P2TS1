import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FechaDialogComponent } from '../fecha-dialog/fecha-dialog.component';
import { AutorizacionService } from '../../services/autorizacion.service';
import { Producto } from 'src/models/Producto';
import { DialogComponent } from '../dialog/dialog.component';
import { FechaGlobalService } from 'src/app/services/fecha-global.service';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.css']
})
export class AutorizarComponent implements OnInit {

  productos: Producto[] = []

  //Paginacion
  public page!: number;

  constructor(
    public dialog: MatDialog,
    private autorizacionService: AutorizacionService,
    private fechaGlobalService: FechaGlobalService
  ) {
    this.listarSolicitudes();
  }

  listarSolicitudes() {
    this.autorizacionService.getProductosAutorizar().subscribe((resp: Producto[]) => {
      this.productos = resp;
      this.formatearFechas(this.productos)
    })
  }

  formatearFechas(productos: Producto[]) {
    productos.forEach(producto => {
      producto.solicitud.fecha_solicitud = this.fechaGlobalService.convertirFechaFormatoDDMMYYY(producto.solicitud.fecha_solicitud)
    });
  }

  ngOnInit(): void {
  }

  openDialog(producto: Producto): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: producto,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarSolicitudes()
    });
  }

}
