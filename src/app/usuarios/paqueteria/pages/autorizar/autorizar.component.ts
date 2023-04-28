import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FechaDialogComponent } from '../fecha-dialog/fecha-dialog.component';
import { AutorizacionService } from '../../services/autorizacion.service';
import { Producto } from 'src/models/Producto';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.css']
})
export class AutorizarComponent implements OnInit {

  animal!: string;
  name!: string;

  productos: Producto[] = []

  constructor(
    public dialog: MatDialog,
    private autorizacionService: AutorizacionService
  ) {
    this.listarSolicitudes();
  }

  listarSolicitudes() {
    this.autorizacionService.getProductosAutorizar().subscribe((resp: Producto[]) => {
      this.productos = resp;
    })
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
