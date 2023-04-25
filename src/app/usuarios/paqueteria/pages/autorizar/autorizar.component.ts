import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FechaDialogComponent } from '../fecha-dialog/fecha-dialog.component';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.css']
})
export class AutorizarComponent implements OnInit {

  animal!: string;
  name!: string;

  tablas: any = [1, 2, 3, 4, 5]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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

}
