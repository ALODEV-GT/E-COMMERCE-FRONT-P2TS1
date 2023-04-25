import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/usuarios/paqueteria/pages/pedidos/pedidos.component';

@Component({
  selector: 'app-edigar-dialog-usuario',
  templateUrl: './edigar-dialog-usuario.component.html',
  styleUrls: ['./edigar-dialog-usuario.component.css']
})
export class EdigarDialogUsuarioComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<EdigarDialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
