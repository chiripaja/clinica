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
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      fechaNacimiento: ['', Validators.required],
      IdDocIdentidad: ['', Validators.required],
      nroDocumento: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', Validators.required],
      direccionDomicilio: ['', Validators.required],
      idTipoSexo: [null, Validators.required],
      idEstadoCivil: [null, Validators.required],
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
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      const data = this.pacienteForm.value;
      console.log(data)
      if (this.data && this.data.id_lote) {
        data.id_lote = this.data.id_lote;
        console.log(data)
        this.pacienteService.updatePaciente(this.data.id_lote, data).subscribe({
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
