import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MedicamentosService } from '../../../../core/services/medicamentos.service';
import { TipogeneralService } from '../../../../core/services/tipogeneral.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertsweetService } from 'src/app/core/services/alertsweet.service';
import { LotesService } from '../../../../core/services/lotes.service';
import { ProveedorService } from '../../../../core/services/proveedor.service';
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
  optionsProveedores: any[] = [];
  tipogeneralService = inject(TipogeneralService);
  alertsweetService = inject(AlertsweetService);
  lotesService = inject(LotesService);
  proveedorService = inject(ProveedorService)
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<LotsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.lotesForm = this.fb.group({
      id_medicamento: ['', Validators.required],
      id_proveedor:['',Validators.required],
      numero_lote: ['', Validators.required],
      fecha_fabricacion: ['', Validators.required],
      fecha_vencimiento: ['', Validators.required],
      cantidad_ingreso: [0, [Validators.required, Validators.min(0)]],
      id_almacen: ['', Validators.required],
      precio_compra_lote: [0, [Validators.required, Validators.min(0)]],
      observaciones: [''],
    });
  }

  ngOnInit() {
    this.medicamentosService.getMedicamento().subscribe(data => {
      this.optionsMedicamento = data;
    });
    this.tipogeneralService.getAlmacen().subscribe(data => {
      this.optionsAlmacen = data
    })
    this.proveedorService.getProveedores().subscribe(data => {
      this.optionsProveedores = data
    })
    if (this.data && this.data.id_medicamento) {
      this.lotesForm.patchValue({
        id_medicamento: this.data.id_medicamento,
        numero_lote: this.data.numero_lote,
        fecha_fabricacion: this.data.fecha_fabricacion,
        fecha_vencimiento: this.data.fecha_vencimiento,
        cantidad_ingreso: this.data.cantidad_ingreso,
        id_almacen: this.data.id_almacen,
        precio_compra_lote: this.data.precio_compra_lote,
        observaciones: this.data.observaciones,
        id_proveedor:this.data.id_proveedor
      });
    }
  }



  onSubmit() {
    console.log("***********")
    console.log(this.lotesForm.value)
    console.log("***********")
    if (this.lotesForm.valid) {
      const data = this.lotesForm.value;

      if (this.data && this.data.id_lote) {

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
            console.log(response)
            this.alertsweetService.mostrarExito("Lote creado exitosamente");
           // this.lotesForm.reset();
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
