import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EdigarDialogUsuarioComponent } from './pages/edigar-dialog-usuario/edigar-dialog-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopProductosVendidosComponent } from './reportes/top-productos-vendidos/top-productos-vendidos.component';
import { TopClientesGananciasComponent } from './reportes/top-clientes-ganancias/top-clientes-ganancias.component';
import { TopClientesProductosVendidosComponent } from './reportes/top-clientes-productos-vendidos/top-clientes-productos-vendidos.component';
import { TopClientesPedidosComponent } from './reportes/top-clientes-pedidos/top-clientes-pedidos.component';
import { TopClientesStockComponent } from './reportes/top-clientes-stock/top-clientes-stock.component';
import { ListadoComponent } from './reportes/listado/listado.component';


@NgModule({
  declarations: [
    InicioComponent,
    ReportesComponent,
    UsuariosComponent,
    EdigarDialogUsuarioComponent,
    TopProductosVendidosComponent,
    TopClientesGananciasComponent,
    TopClientesProductosVendidosComponent,
    TopClientesPedidosComponent,
    TopClientesStockComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
