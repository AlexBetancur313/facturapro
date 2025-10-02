import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes y Rutas de este Módulo
import { LoginComponent } from './pages/login/login.component';
import { AUTH_ROUTES } from './auth.routes';

// Módulos de Angular Material que se usan AQUÍ
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    // 1. Declara que LoginComponent pertenece a ESTE módulo.
    LoginComponent,
  ],
  imports: [
    // 2. Importa todo lo que LoginComponent necesita para funcionar.
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AUTH_ROUTES), // Conecta sus rutas hijas.
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AuthModule {}
