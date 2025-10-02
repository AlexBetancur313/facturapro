import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './features/dashboard/pages/dashboard-home/dashboard-home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    // Carga el MÓDULO completo cuando el usuario va a una ruta '/auth/...'.
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [AuthGuard], // Ruta protegida.
  },
  {
    // Redirección por defecto al entrar a la web.
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    // Cualquier otra ruta que no exista, redirige al login.
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
