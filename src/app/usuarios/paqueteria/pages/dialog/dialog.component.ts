import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/models/Producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutorizacionService } from '../../services/autorizacion.service';
import { ProductoService } from 'src/app/usuarios/comun/services/producto.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    private snackBar: MatSnackBar,
    private autorizacionService: AutorizacionService,
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
  ) {
    this.productoService.getImgProducto(data.imagen).subscribe((res) => {
      this.productoService.createImageFromBlob(res, data)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  autorizar() {
    this.data.solicitud.estado = "aceptado"
    this.data.imagenContenido = ""
    this.autorizacionService.autorizarProducto(this.data).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Se ha aceptado el producto", "X")
        this.onNoClick()
      } else {
        this.openSnackBar("No se realizo ningun cambio", "X")
        this.onNoClick()
      }
    });
  }

  denegar() {
    this.data.solicitud.estado = "rechazado";
    this.data.imagenContenido = ""
    this.autorizacionService.autorizarProducto(this.data).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Se ha denegado el producto", "X")
        this.onNoClick()
      } else {
        this.openSnackBar("No se realizo ningun cambio", "X")
        this.onNoClick()
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


}
