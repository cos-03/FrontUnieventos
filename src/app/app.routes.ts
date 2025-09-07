

import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { EditarCuentaComponent } from './componentes/editar-cuenta/editar-cuenta.component';
import { LoginGuard } from './guards/permiso.service';
import { NuevaContraseniaComponent } from './componentes/nueva-contrasenia/nueva-contrasenia.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },  // Inicio
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },  // Login
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },  // Registro
  { path: 'cuenta', component: EditarCuentaComponent },  // Gestión de cuenta
  { path: 'nueva-contrasenia', component: NuevaContraseniaComponent }, // Recuperar/cambiar contraseña
  { path: '**', redirectTo: '' }  // Redirección a inicio
];
