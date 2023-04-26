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



@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    CarritoComponent,
    PedidosComponent,
    ProductoCardComponent,
    MisProductosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComunRoutingModule
  ]
})
export class ComunModule { }
