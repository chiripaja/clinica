import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../../../../core/services/servicios.service';
@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss']
})
export class AdmissionFormComponent {
  atencionForm: FormGroup;
  serviciosService=inject(ServiciosService);
  serviciosSelect:any[]=[];
  constructor(private fb: FormBuilder) {
    this.atencionForm = this.fb.group({
      IdPaciente: ['', [Validators.required]],
      Edad: ['', [Validators.required, Validators.min(1)]],
      FechaIngreso: ['', [Validators.required]],
      IdServicioIngreso: ['', [Validators.required]],
      IdMedicoIngreso: ['', [Validators.required]],
      idFuenteFinanciamiento: ['', [Validators.required]],
      IdTipoServicio: ['', [Validators.required]],
      IdOrigenAtencion: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.serviciosService.getServicio().subscribe(data=>{

      this.serviciosSelect=data
    })
    
  }

  onSubmit() {
    if (this.atencionForm.valid) {
      console.log('Formulario válido:', this.atencionForm.value);
      // Aquí se puede enviar la información al backend usando HTTP
    } else {
      console.log('Formulario inválido');
    }
  }
}
