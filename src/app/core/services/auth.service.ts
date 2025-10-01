import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Signal para almacenar el estado del usuario actual. Inicia como null.
  currentUser = signal<User | null>(null);

  // Signal computada que nos dirá si el usuario está logueado o no.
  // Reacciona automáticamente a los cambios en currentUser.
  isLoggedIn = computed(() => this.currentUser() !== null);

  constructor(private router: Router) {}

  login(email: string, password: string) {
    console.log('Iniciando sesión con:', email);

    const fakeUser: User = {
      uid: 'fake-user-id-123',
      email: email,
      name: 'Wilson Chica',
      role: 'superadmin',
    };

    return of(fakeUser).pipe(
      tap((user) => {
        // Al iniciar sesión, actualizamos el signal.
        this.currentUser.set(user);
        console.log('Usuario autenticado:', this.currentUser());
        // Navegamos al dashboard después de un login exitoso.
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout() {
    // Al cerrar sesión, volvemos el signal a null y redirigimos al login.
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }
}
