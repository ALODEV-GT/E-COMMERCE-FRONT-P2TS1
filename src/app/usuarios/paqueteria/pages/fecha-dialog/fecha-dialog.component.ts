import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Orden } from 'src/models/Orden';
import { FechaGlobalService } from '../../../../services/fecha-global.service';
import { OrdenService } from '../../services/orden.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fecha-dialog',
  templateUrl: './fecha-dialog.component.html',
  styleUrls: ['./fecha-dialog.component.css']
})
export class FechaDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private fechaGlobalService: FechaGlobalService,
    private ordenService: OrdenService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FechaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Orden,
  ) {
    this.miFormulario.controls["fechaPedido"].setValue(this.fechaGlobalService.convertirFechaFormatoYYYYMMDD(data.fecha_pedido));
    this.miFormulario.controls["fechaEntrega"].setValue(this.fechaGlobalService.convertirFechaFormatoYYYYMMDD(data.fecha_entrega));
  }

  ngOnInit(): void {
  }

  miFormulario: FormGroup = this.fb.group({
    fechaPedido: ['', [Validators.required]],
    fechaEntrega: ['', [Validators.required]],
  },

  )

  onNoClick(): void {
    this.dialogRef.close();
  }

  editar() {
    const fechaEntrega: string = this.miFormulario.get('fechaEntrega')?.value;
    this.data.fecha_entrega = fechaEntrega;
    this.ordenService.cambiarFechaEntrega(this.data).subscribe((resp: boolean) => {
      if (resp) {
        this.openSnackBar("Se cambio la fecha de entrega", "X")
        this.onNoClick()
      } else {
        this.openSnackBar("No se pudo cambiar la fecha de entrega", "X")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
