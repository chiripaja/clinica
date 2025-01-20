import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MedicamentosService } from 'src/app/core/services/medicamentos.service';
import { RecetasService } from '../../../../core/services/recetas.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent {
  private fb = inject(FormBuilder);
  ordenesForm = this.fb.group({
    idmedicamento: [null, Validators.required],
    cantidad: ['', Validators.required],
    observaciones: ['', Validators.required],
  });
  displayedColumns: string[] = ['medicamento', 'cantidad', 'observaciones'];
  listaOrdenesFarmaciaPreProcesar:any[]=[]
  medicamentosService = inject(MedicamentosService);
  recetasService=inject(RecetasService);
  optionsMedicamento: any[] = [];
  ngOnInit() {
    this.medicamentosService.getMedicamento().subscribe(data => {
      this.optionsMedicamento = data;
    });
  }
  onSubmit() {
    const selectedMedicamento = this.ordenesForm.value.idmedicamento as any | null;

    if (selectedMedicamento) { // Verificamos que el medicamento no sea null
    
    const ObjetoFarmacia={
      idmedicamento:selectedMedicamento.id_medicamento,
      nombremedicamento:selectedMedicamento.nombre,
      cantidad:this.ordenesForm.value.cantidad,
      observaciones:this.ordenesForm.value.observaciones,
    }
    this.listaOrdenesFarmaciaPreProcesar.push(ObjetoFarmacia)
   
    console.log(this.listaOrdenesFarmaciaPreProcesar)
    
    }
 


  }

  CrearOrdenFarmacia(){
    this.recetasService.crearRecetasFarmacia(this.listaOrdenesFarmaciaPreProcesar).subscribe(data=>{
      console.log("*********")
      console.log(data)
    })
  }
  deleteMedicamento(idmedicamento:any){
    console.log(idmedicamento)
    this.listaOrdenesFarmaciaPreProcesar = this.listaOrdenesFarmaciaPreProcesar.filter(item => item.idmedicamento !== idmedicamento);
  }
}

