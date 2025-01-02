import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent {


  patientForm: FormGroup;

  constructor(private fb: FormBuilder,) {
    this.patientForm = this.fb.group({
      primerNombre: ['', [Validators.required]],
      segundoNombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      tipoDocumento: ['1', Validators.required],
      numeroDocumento: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      console.log('Formulario enviado:', this.patientForm.value);
      // Lógica para enviar datos al backend
    }
  }

  onReset() {
    this.patientForm.reset({
      tipoDocumento: 1,
    });
  }


}
