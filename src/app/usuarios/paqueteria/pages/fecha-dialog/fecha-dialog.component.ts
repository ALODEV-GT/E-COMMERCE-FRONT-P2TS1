import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../pedidos/pedidos.component';

@Component({
  selector: 'app-fecha-dialog',
  templateUrl: './fecha-dialog.component.html',
  styleUrls: ['./fecha-dialog.component.css']
})
export class FechaDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FechaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
