import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MedicamentosService } from '../../../../core/services/medicamentos.service';
import { TipogeneralService } from '../../../../core/services/tipogeneral.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertsweetService } from 'src/app/core/services/alertsweet.service';
import { LotesService } from '../../../../core/services/lotes.service';
@Component({
  selector: 'app-lots-form',
  templateUrl: './lots-form.component.html',
  styleUrls: ['./lots-form.component.scss']
})
export class LotsFormComponent {
  lotesForm: FormGroup;
  medicamentosService = inject(MedicamentosService);
  optionsMedicamento: any[] = [];
  optionsAlmacen: any[] = [];
  tipogeneralService = inject(TipogeneralService);
  alertsweetService = inject(AlertsweetService);
  lotesService = inject(LotesService);
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<LotsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.lotesForm = this.fb.group({
      id_medicamento: ['', Validators.required],
      numero_lote: ['', Validators.required],
      fecha_fabricacion: ['', Validators.required],
      fecha_vencimiento: ['', Validators.required],
      cantidad_inicial: [0, [Validators.required, Validators.min(0)]],
      cantidad_actual: [0, [Validators.required, Validators.min(0)]],
      id_almacen: ['', Validators.required],
      precio_compra_lote: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.medicamentosService.getMedicamento().subscribe(data => {
      this.optionsMedicamento = data;
    });
    this.tipogeneralService.getAlmacen().subscribe(data => {
      this.optionsAlmacen = data
    })
    if (this.data && this.data.id_medicamento) {
   
      this.lotesForm.patchValue({
        id_medicamento: this.data.id_medicamento,
        numero_lote: this.data.numero_lote,
        fecha_fabricacion: this.data.fecha_fabricacion,
        fecha_vencimiento: this.data.fecha_vencimiento,
        cantidad_inicial: this.data.cantidad_inicial,
        cantidad_actual: this.data.cantidad_actual,
        id_almacen: this.data.id_almacen,
        precio_compra_lote: this.data.precio_compra_lote,
      });
    }
  }



  onSubmit() {
    
    if (this.lotesForm.valid) {
      const data = this.lotesForm.value;
   
      if (this.data && this.data.id_lote) {
        data.id_lote = this.data.id_lote;
  
        this.lotesService.updateLotes(this.data.id_lote, data).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Lote actualizado exitosamente");
            this.onNoClick();
          },
          error: (err) => {
            console.log("Error al actualizar Lote", err);
          }
        });
      } else {
        this.lotesService.createLotes(data).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Lote creado exitosamente");
            this.lotesForm.reset();
          },
          error: (err) => {
            console.log("Error al crear Lote", err);
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


}
