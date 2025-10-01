import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Usamos nuestro signal computado para ver si el usuario está logueado.
    if (this.authService.isLoggedIn()) {
      return true; // Si está logueado, permite el acceso a la ruta.
    }

    // Si no está logueado, redirige a la página de login y bloquea el acceso.
    this.router.navigate(['/auth/login']);
    return false;
  }
}
