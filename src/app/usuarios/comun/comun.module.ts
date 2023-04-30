import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ComunRoutingModule } from './comun-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ProductoCardComponent } from './pages/producto-card/producto-card.component';
import { MisProductosComponent } from './pages/mis-productos/mis-productos.component';
import { DialogAgregarComponent } from './pages/dialog-agregar/dialog-agregar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RechazadosComponent } from './pages/rechazados/rechazados.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { DialogEditarComponent } from './pages/dialog-editar/dialog-editar.component';

@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    CarritoComponent,
    PedidosComponent,
    ProductoCardComponent,
    MisProductosComponent,
    DialogAgregarComponent,
    RechazadosComponent,
    VentasComponent,
    DialogEditarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComunRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComunModule { }
