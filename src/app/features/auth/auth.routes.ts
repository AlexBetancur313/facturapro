import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

// Define que dentro de la sección 'auth', la ruta 'login' carga el LoginComponent.
export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    // Si alguien entra a '/auth' sin especificar más, lo redirige a '/auth/login'.
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
