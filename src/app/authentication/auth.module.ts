import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    AuthRoutingModule
  ], exports: [
  ]
})
export class AuthModule { }
