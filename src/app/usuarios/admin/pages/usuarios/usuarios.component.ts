import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EdigarDialogUsuarioComponent } from '../edigar-dialog-usuario/edigar-dialog-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  animal!: string;
  name!: string;

  filas: any = [1, 2, 3, 4]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EdigarDialogUsuarioComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
