import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { AutorizarComponent } from './pages/autorizar/autorizar.component';
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
        path: 'pedidos',
        component: PedidosComponent
      },
      {
        path: 'autorizacion',
        component: AutorizarComponent
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
export class PaqueteriaRoutingModule { }
