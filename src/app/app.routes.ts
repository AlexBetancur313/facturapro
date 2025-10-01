import { Routes } from '@angular/router';

export const routes: Routes = [
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
    // Si el usuario intenta ir a cualquier otra ruta que no exista,
    // también lo redirigimos al login.
    path: '**',
    redirectTo: '/auth/login',
  },
];
