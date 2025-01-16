import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipogeneralService } from '../../../../core/services/tipogeneral.service';
import { PacienteService } from '../../../../core/services/paciente.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertsweetService } from 'src/app/core/services/alertsweet.service';
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent {
  pacienteForm: FormGroup;
  tipogeneralService=inject(TipogeneralService)
  sexoSelect:any[]=[]
  documentSelect:any[]=[]
  estadosCiviles = [
    { id: 1, nombre: 'Soltero' },
    { id: 2, nombre: 'Casado' },
    { id: 3, nombre: 'Divorciado' },
    { id: 4, nombre: 'Viudo' },
  ];
  pacienteService=inject(PacienteService)
  alertsweetService = inject(AlertsweetService);
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<PatientFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pacienteForm = this.fb.group({
      IdDocIdentidad: [1, Validators.required],
      ApellidoPaterno: ['', Validators.required],
      ApellidoMaterno: ['', Validators.required],
      PrimerNombre: ['', Validators.required],
      SegundoNombre: [''],
      FechaNacimiento: ['', Validators.required],
      NroDocumento: ['', [Validators.required, Validators.minLength(8)]], 
      Telefono: ['', Validators.required],
      DireccionDomicilio: ['', Validators.required],
      IdTipoSexo: [1, Validators.required],
      IdEstadoCivil: [1, Validators.required],
      idPaisDomicilio: [null],
      idDistritoDomicilio: [null],
    });
  }

  ngOnInit(): void {
    this.tipogeneralService.getTipoSexo().subscribe(data=>{
      this.sexoSelect=data
    })
    this.tipogeneralService.getTipoDocumento().subscribe(data=>{
      this.documentSelect=data
    })
    if (this.data && this.data.IdPaciente) {
      console.log(this.data.idTipoSexo)
      this.pacienteForm.patchValue({
        IdDocIdentidad: this.data.IdDocIdentidad,
        ApellidoPaterno: this.data.ApellidoPaterno,
        ApellidoMaterno: this.data.ApellidoMaterno,
        PrimerNombre: this.data.PrimerNombre,
        SegundoNombre: this.data.SegundoNombre,
        FechaNacimiento: this.data.FechaNacimiento,
        NroDocumento: this.data.NroDocumento,
        Telefono: this.data.Telefono,
        DireccionDomicilio: this.data.DireccionDomicilio,
        IdTipoSexo: this.data.IdTipoSexo,
        IdEstadoCivil: this.data.IdEstadoCivil
      });
    }
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      const data = this.pacienteForm.value;
      console.log(data)
      if (this.data && this.data.IdPaciente) {
        data.IdPaciente = this.data.IdPaciente;
  
        this.pacienteService.updatePaciente(this.data.IdPaciente, data).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Paciente actualizado exitosamente");
            this.onNoClick();
          },
          error: (err) => {
            console.log("Error al actualizar Paciente", err);
          }
        });
      } else {
        this.pacienteService.createPaciente(data).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Paciente creado exitosamente");
            this.pacienteForm.reset();
          },
          error: (err) => {
            this.alertsweetService.mostrarError(err?.error?.error);
            console.log("Error al crear Paciente", err);
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
  onReset() {
    this.pacienteForm.reset({
      tipoDocumento: 1,
    });
  }


}
