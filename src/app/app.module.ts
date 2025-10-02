import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Componentes que pertenecen al MÓDULO PRINCIPAL
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { DashboardHomeComponent } from './features/dashboard/pages/dashboard-home/dashboard-home.component';
import { DocumentEditorComponent } from './features/dashboard/components/document-editor/document-editor.component';

// Módulos GLOBALES de Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    // Solo declaramos componentes que no pertenecen a otro módulo.
    AppComponent,
    HeaderComponent,
    DashboardHomeComponent,
    DocumentEditorComponent,
  ],
  imports: [
    // Módulos esenciales para que la aplicación funcione.
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule, // ¡Muy importante! Conecta el enrutador.
    ReactiveFormsModule,

    // Módulos de Material usados en los componentes de arriba.
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
