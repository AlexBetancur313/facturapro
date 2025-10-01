import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css'],
})
export class DocumentEditorComponent implements OnInit {
  // SOLUCIÓN AL ERROR #1: Usamos el "non-null assertion operator" (!)
  // para decirle a TypeScript: "Confía en mí, inicializaré esta variable en ngOnInit".
  documentForm!: FormGroup;

  // Usamos FormBuilder para crear formularios complejos más fácilmente.
  constructor(private fb: FormBuilder) {}

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
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  calculateItemTotal(index: number): number {
    const item = this.items.at(index).value;
    return (item.quantity || 0) * (item.unitValue || 0);
  }

  calculateSubtotal(): number {
    return this.items.value.reduce((acc: number, item: { quantity: number; unitValue: number }) => {
      return acc + (item.quantity || 0) * (item.unitValue || 0);
    }, 0);
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      console.log('Formulario Válido:', this.documentForm.value);
    } else {
      console.error('Formulario Inválido');
      this.documentForm.markAllAsTouched();
    }
  }
}
