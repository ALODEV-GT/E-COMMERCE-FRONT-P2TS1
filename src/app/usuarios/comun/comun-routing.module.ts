import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ProductoCardComponent } from './pages/producto-card/producto-card.component';
import { MisProductosComponent } from './pages/mis-productos/mis-productos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { RechazadosComponent } from './pages/rechazados/rechazados.component';
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
        path: 'productos',
        component: ProductosComponent
      },
      {
        path: 'mis-productos',
        component: MisProductosComponent
      },
      {
        path: 'mis-ventas',
        component: VentasComponent
      },
      {
        path: 'rechazados',
        component: RechazadosComponent
      },
      {
        path: 'carrito',
        component: CarritoComponent
      },
      {
        path: 'pedidos',
        component: PedidosComponent
      },
      {
        path: 'producto-card',
        component: ProductoCardComponent
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
export class ComunRoutingModule { }
