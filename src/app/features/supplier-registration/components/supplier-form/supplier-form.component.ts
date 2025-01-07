import { Component, Inject,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../../../../core/services/proveedor.service';
import { AlertsweetService } from '../../../../core/services/alertsweet.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent {
  proveedorForm: FormGroup;
  tiposProveedor: string[] = ['Servicios', 'Suministros', 'Mantenimiento', 'Otros'];
  proveedorService=inject(ProveedorService);
  alertsweetService=inject(AlertsweetService);
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
      const proveedorData = this.proveedorForm.value;
      if (this.data && this.data.id_proveedor) {
        proveedorData.id_proveedor = this.data.id_proveedor;  
        this.proveedorService.updateProveedor(this.data.id_proveedor,proveedorData).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Proveedor actualizado exitosamente");
            this.onNoClick();
          },
          error: (err) => {
            console.log("Error al actualizar proveedor", err);
          }
        });
      } else {
        this.proveedorService.createProveedor(proveedorData).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Proveedor creado exitosamente");
            this.proveedorForm.reset();
          },
          error: (err) => {
            console.log("Error al crear proveedor", err);
          }
        });
      }
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
  ngOnInit() {
    if (this.data && this.data.id_proveedor) {
      this.proveedorForm.patchValue({
        nombre_proveedor: this.data.nombre_proveedor,
        ruc: this.data.ruc,
        direccion: this.data.direccion,
        telefono: this.data.telefono,
        email: this.data.email,
        tipo_proveedor: this.data.tipo_proveedor,
        observaciones: this.data.observaciones
      });
    }
 
  }
}
