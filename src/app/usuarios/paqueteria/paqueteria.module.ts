import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PaqueteriaRoutingModule } from './paqueteria-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { DialogComponent } from './pages/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutorizarComponent } from './pages/autorizar/autorizar.component';
import { FechaDialogComponent } from './pages/fecha-dialog/fecha-dialog.component';



@NgModule({
  declarations: [
    InicioComponent,
    PedidosComponent,
    DialogComponent,
    AutorizarComponent,
    FechaDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PaqueteriaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaqueteriaModule { }
