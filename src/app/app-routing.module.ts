import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';

const rutas: Routes = [
  {
    //LazyLoad
    path: 'autenticacion',
    loadChildren: () => import('./authentication/auth.module').then(
      m => m.AuthModule
    )
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuarios/comun/comun.module').then(
      m => m.ComunModule
    )
  },
  {
    path: 'paqueteria',
    loadChildren: () => import('./usuarios/paqueteria/paqueteria.module').then(
      m => m.PaqueteriaModule
    )
  },
  {
    path: "administrador",
    loadChildren: () => import('./usuarios/admin/admin.module').then(
      m => m.AdminModule
    )
  },
  {
    path: '', redirectTo: 'autenticacion/login', pathMatch: 'full'
  },
  {
    path: '404', //Pagina de error
    component: ErrorPageComponent
  },
  {
    path: '**', //Cualquier otra pagina que no existe.
    redirectTo: '404'
  }

]

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
