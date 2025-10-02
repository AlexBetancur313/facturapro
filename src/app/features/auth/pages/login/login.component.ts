import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  // --- ESTA ES LA CORRECCIÓN CLAVE ---
  // Hemos quitado la propiedad 'imports' por completo.
  // Ahora este componente es "clásico" y depende de su módulo (AuthModule)
  // para obtener todo lo que necesita (CommonModule, MatCardModule, etc.).
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Inyectamos nuestros servicios de forma moderna.
  private authService = inject(AuthService);
  private router = inject(Router);

  hidePassword = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // Se ejecuta al enviar el formulario.
  onSubmit() {
    if (this.loginForm.invalid) {
      return; // Si el formulario no es válido, no hacemos nada.
    }

    const { email, password } = this.loginForm.value;

    if (email && password) {
      // Llamamos a nuestro servicio de autenticación.
      this.authService.login(email, password).subscribe({
        next: (user) => {
          if (user) {
            // La navegación al dashboard ya se hace dentro del servicio.
            console.log('Login exitoso, navegando al dashboard...');
          }
        },
        error: (err) => {
          console.error('El email o la contraseña son incorrectos.', err);
        },
      });
    }
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }
}
