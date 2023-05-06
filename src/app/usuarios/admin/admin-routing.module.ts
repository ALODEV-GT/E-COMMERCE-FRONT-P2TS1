import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ListadoComponent } from './reportes/listado/listado.component';
import { TopProductosVendidosComponent } from './reportes/top-productos-vendidos/top-productos-vendidos.component';
import { TopClientesStockComponent } from './reportes/top-clientes-stock/top-clientes-stock.component';
import { TopClientesPedidosComponent } from './reportes/top-clientes-pedidos/top-clientes-pedidos.component';
import { TopClientesGananciasComponent } from './reportes/top-clientes-ganancias/top-clientes-ganancias.component';
import { TopClientesProductosVendidosComponent } from './reportes/top-clientes-productos-vendidos/top-clientes-productos-vendidos.component';
import { PerfilComponent } from '../components/perfil/perfil.component';

const rutas: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        children: [

          {
            path: 'listado',
            component: ListadoComponent
          },
          {
            path: 'top-productos-vendidos',
            component: TopProductosVendidosComponent
          },
          {
            path: 'top-clientes-ganancias',
            component: TopClientesGananciasComponent
          },
          {
            path: 'top-clientes-productos-vendidos',
            component: TopClientesProductosVendidosComponent
          },
          {
            path: 'top-clientes-pedidos',
            component: TopClientesPedidosComponent
          },
          {
            path: 'top-clientes-stock',
            component: TopClientesStockComponent
          },
          {
            path: "**",
            redirectTo: 'listado'
          }
        ]
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'pedidos',
        //component: PedidosComponent
      },
      {
        path: 'producto-card',
        //component: ProductoCardComponent
      },
      {
        path: 'volumenes/:revista',
        //component: VolumenesComponent
      }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutas)
  ], exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
