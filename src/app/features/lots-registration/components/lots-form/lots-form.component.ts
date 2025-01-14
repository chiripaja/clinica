import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MedicamentosService } from '../../../../core/services/medicamentos.service';
@Component({
  selector: 'app-lots-form',
  templateUrl: './lots-form.component.html',
  styleUrls: ['./lots-form.component.scss']
})
export class LotsFormComponent {
  lotesForm: FormGroup;
  medicamentosService = inject(MedicamentosService);
  optionsMedicamento: any[] = [];


  constructor(private fb: FormBuilder) {
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
  }



  onSubmit() {
    console.log(this.lotesForm.value);
    if (this.lotesForm.valid) {
      console.log('Formulario enviado:', this.lotesForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
