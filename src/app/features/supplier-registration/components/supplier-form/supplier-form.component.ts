import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent {
  proveedorForm: FormGroup;

  // Lista de tipos de proveedor (puedes personalizar)
  tiposProveedor: string[] = ['Servicios', 'Suministros', 'Mantenimiento', 'Otros'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SupplierFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.proveedorForm = this.fb.group({
      nombre_proveedor: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.minLength(11)]],
      direccion: [''],
      telefono: [''],
      email: ['', [Validators.email]],
      tipo_proveedor: ['', Validators.required],
      observaciones: ['']
    });
  }

  onSubmit() {
    if (this.proveedorForm.valid) {
      console.log('Datos del proveedor:', this.proveedorForm.value);
      // Lógica para enviar los datos al backend
    } else {
      console.error('Formulario inválido');
    }
  }

  onReset() {
    this.proveedorForm.reset();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
