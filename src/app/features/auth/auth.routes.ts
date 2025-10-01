import { Routes } from '@angular/router';

// Rutas específicas para la característica de autenticación
export const AUTH_ROUTES: Routes = [
  {
    path: 'login', // La URL será tudominio.com/auth/login
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    // Redirige cualquier ruta vacía dentro de 'auth' a 'login'
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
