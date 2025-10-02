import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // Ahora apuntamos a nuestro servidor backend real
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Genera un nuevo documento llamando al backend.
   * @param documentData Los datos del formulario.
   * @returns Un Observable con la respuesta del backend.
   */
  generateDocument(
    documentData: any
  ): Observable<{ success: boolean; pdfBase64: string }> {
    console.log('Enviando datos al backend real:', documentData);

    // --- ESTA ES LA LLAMADA HTTP REAL ---
    return this.http
      .post<{ success: boolean; pdfBase64: string }>(
        `${this.apiUrl}/generate-pdf`,
        documentData
      )
      .pipe(
        tap((response) => {
          // --- LÓGICA PARA PROBAR LA CONEXIÓN ---
          // Si la respuesta es exitosa y contiene el base64...
          if (response && response.success && response.pdfBase64) {
            console.log(
              'PDF recibido del backend. Abriendo en una nueva pestaña...'
            );
            this.openPdfInNewTab(response.pdfBase64);
          }
        })
      );
  }

  /**
   * Helper para decodificar el base64 y abrir el PDF.
   * @param base64 El string del PDF codificado.
   */
  private openPdfInNewTab(base64: string): void {
    // Decodifica el string base64 a un array de bytes
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Crea un Blob (Binary Large Object) de tipo PDF
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Crea una URL para el Blob y la abre en una nueva pestaña
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
  }
}
