import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicamentosService } from '../../../../core/services/medicamentos.service';
import { AlertsweetService } from 'src/app/core/services/alertsweet.service';

@Component({
  selector: 'app-medications-form',
  templateUrl: './medications-form.component.html',
  styleUrls: ['./medications-form.component.scss']
})
export class MedicationsFormComponent {
  medicamentoForm: FormGroup;
  medicamentosService=inject(MedicamentosService);
  alertsweetService=inject(AlertsweetService);
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MedicationsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.medicamentoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      presentacion: ['', Validators.required],
      unidad_medida: ['', Validators.required],
      precio_compra: ['', [Validators.required, Validators.min(0)]],
      precio_venta: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.medicamentoForm.valid) {
      const data = this.medicamentoForm.value;
      if (this.data && this.data.id_medicamento) {
        data.id_medicamento = this.data.id_medicamento;  
        this.medicamentosService.updateMedicamento(this.data.id_medicamento,data).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Medicamento actualizado exitosamente");
            this.onNoClick();
          },
          error: (err) => {
            console.log("Error al actualizar Medicamento", err);
          }
        });
      } else {
        this.medicamentosService.createMedicamento(data).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Medicamento creado exitosamente");
            this.medicamentoForm.reset();
          },
          error: (err) => {
            console.log("Error al crear Medicamento", err);
          }
        });
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data && this.data.id_medicamento) {
      console.log(this.data)
      this.medicamentoForm.patchValue({
        nombre: this.data.nombre,
        descripcion: this.data.descripcion,
        presentacion: this.data.presentacion,
        unidad_medida: this.data.unidad_medida,
        precio_compra: this.data.precio_compra,
        precio_venta: this.data.precio_venta
      });
    }
 
  }
}
