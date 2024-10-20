import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { CrearCuponComponent } from './componentes/crear-cupon/crear-cupon.component';
import { EditarEventoComponent } from './componentes/editar-evento/editar-evento.component';
import { ConfirmarOrdenComponent } from './componentes/confirmar-orden/confirmar-orden.component';
import { AgregarItemComponent } from './componentes/agregar-item/agregar-item.component';
import { DetalleEventoComponent } from './componentes/detalle-evento/detalle-evento.component';
import { RecuperarContraseniaComponent } from './componentes/recuperar-contrasenia/recuperar-contrasenia.component';

export const routes: Routes = [
   { path: '', component: InicioComponent },  // Ruta raíz
   { path: 'login', component: LoginComponent },  // Ruta para login
   { path: 'registro', component: RegistroComponent },  // Ruta para registro
   { path: 'crear-evento', component: CrearEventoComponent },  // Ruta para crear evento
   { path: 'carrito', component: CarritoComponent },  // Ruta para el carrito de compras
   { path: 'crear-cupon', component: CrearCuponComponent },  // Ruta para crear cupones
   { path: 'editar-evento', component: EditarEventoComponent },  // Ruta para editar un evento
   { path: 'confirmar-orden', component: ConfirmarOrdenComponent },  // Ruta para confirmar orden
   { path: 'agregar-item', component: AgregarItemComponent },  // Ruta para agregar ítems
   { path: 'detalle-evento', component: DetalleEventoComponent },  // Ruta para ver el detalle de un evento
   { path: 'recuperar-contrasenia', component: RecuperarContraseniaComponent },  // Ruta para recuperar contraseña
   { path: "**", pathMatch: "full", redirectTo: "" }  // Redirección a la página de inicio para rutas no encontradas
];
