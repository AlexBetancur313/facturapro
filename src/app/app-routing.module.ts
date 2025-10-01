import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './features/dashboard/pages/dashboard-home/dashboard-home.component';
import { AuthGuard } from './core/guards/auth.guards';

// Aquí definimos las rutas, igual que antes.
const routes: Routes = [
  {
    // Cuando la URL empiece con 'auth', carga las rutas definidas en AUTH_ROUTES
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    // Si un usuario entra a la raíz del sitio (ej: tudominio.com),
    // lo redirigimos a la página de login.
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [AuthGuard], // <-- ¡AQUÍ ESTÁ LA PROTECCIÓN!
  },
  {
    // Si el usuario intenta ir a cualquier otra ruta que no exista,
    // también lo redirigimos al login.
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  // Aquí es donde la "magia" ocurre.
  // RouterModule.forRoot(routes) inicializa el enrutador con nuestras rutas.
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], // Lo exportamos para que AppModule pueda usarlo.
})
export class AppRoutingModule {}
