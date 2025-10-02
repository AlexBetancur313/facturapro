import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/core/services/document.service';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css'],
})
export class DocumentEditorComponent implements OnInit {
  // Le decimos a TypeScript que esta variable se inicializará en ngOnInit.
  documentForm!: FormGroup;

  // CORRECCIÓN: Inyectamos los servicios aquí directamente. Es más limpio y moderno.
  private fb = inject(FormBuilder);
  private documentService = inject(DocumentService);

  // No necesitamos un constructor si usamos inject() de esta manera.

  ngOnInit(): void {
    this.documentForm = this.fb.group({
      documentType: ['cxc', Validators.required],
      client: this.fb.group({
        name: ['', Validators.required],
        nit: ['', Validators.required],
        address: [''],
        phone: [''],
        email: ['', Validators.email],
      }),
      items: this.fb.array([this.createItem()]),
    });
  }

  // --- MÉTODOS PARA MANEJAR LOS ÍTEMS ---

  get items(): FormArray {
    return this.documentForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      unit: ['Und', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitValue: [0, [Validators.required, Validators.min(0)]],
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    // Solo permitimos eliminar si queda más de un ítem.
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  // --- MÉTODOS PARA CÁLCULOS ---

  calculateItemTotal(index: number): number {
    const item = this.items.at(index).value;
    return (item.quantity || 0) * (item.unitValue || 0);
  }

  calculateSubtotal(): number {
    // Usamos 'any' aquí para simplicidad, ya que el formulario maneja los tipos.
    return this.items.value.reduce((acc: number, item: any) => {
      return acc + (item.quantity || 0) * (item.unitValue || 0);
    }, 0);
  }

  // --- MÉTODO PARA ENVIAR EL FORMULARIO ---

  onSubmit(): void {
    if (this.documentForm.valid) {
      console.log('Formulario Válido. Enviando al servicio...');

      this.documentService.generateDocument(this.documentForm.value).subscribe({
        next: (response) => {
          console.log('¡Éxito! El backend respondió:', response);
          alert('¡Documento generado exitosamente! (Revisa la consola)');
        },
        error: (err) => {
          console.error('Ocurrió un error al generar el documento:', err);
          alert('Error: No se pudo generar el documento.');
        },
      });
    } else {
      console.error('El formulario tiene errores.');
      this.documentForm.markAllAsTouched();
    }
  }

  // CORRECCIÓN: Se eliminaron todos los métodos duplicados que estaban aquí abajo.
}
