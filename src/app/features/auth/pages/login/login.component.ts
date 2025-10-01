import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

// Importaciones de Angular y Angular Material (asegúrate de tenerlas)
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
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

    // Llamamos a nuestro servicio de autenticación.
    this.authService.login(email!, password!).subscribe((user) => {
      if (user) {
        // Si el login es exitoso, navegamos al dashboard.
        this.router.navigate(['/dashboard']);
      } else {
        // A futuro, aquí mostraremos un error al usuario.
        console.error('El email o la contraseña son incorrectos.');
      }
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }
}
