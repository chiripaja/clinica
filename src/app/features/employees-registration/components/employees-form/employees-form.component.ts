import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipogeneralService } from '../../../../core/services/tipogeneral.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { AlertsweetService } from 'src/app/core/services/alertsweet.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent {
  empleadoForm: FormGroup;
  tipogeneralService = inject(TipogeneralService)
  empleadoService=inject(EmpleadoService)
  alertsweetService=inject(AlertsweetService);
  tipoEmpleadoOptions = [
    { value: 1, label: 'Medicos' },
    { value: 2, label: 'Enfermera' },
    { value: 3, label: 'Tecnico' },
    { value: 4, label: 'Administrativo' }
  ];
  selecttipoDocumento: any[] = []
  selecttipoSexo: any[] = []

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EmployeesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empleadoForm = this.fb.group({
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required],
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // DNI validation
      idDocumento: ['', Validators.required],
      idSexo:['',Validators.required],
      fechaNacimiento: ['', Validators.required],
      tipoEmpleado: [null, Validators.required]
    });
  }


  ngOnInit(): void {
    this.tipogeneralService.getTipoDocumento().subscribe((datos: any) => {
      this.selecttipoDocumento = datos
    })
    this.tipogeneralService.getTipoSexo().subscribe((datos:any)=>{
      this.selecttipoSexo = datos
    })
    console.log(this.data)
    if (this.data && this.data.id_empleado) {
     
      this.empleadoForm.patchValue({
        apellidoPaterno: this.data.apellidoPaterno,
        apellidoMaterno: this.data.apellidoMaterno,
        primerNombre: this.data.primerNombre,
        segundoNombre: this.data.segundoNombre,
        usuario: this.data.usuario,
        clave: this.data.clave,
        dni: this.data.dni,
        idDocumento: this.data.idDocumento,
        idSexo: this.data.idSexo,
        fechaNacimiento: this.data.fechaNacimiento,
        tipoEmpleado: this.data.tipoEmpleado,
      });
    }


  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
  
    if (this.empleadoForm.valid) {
      const empleadoData = this.empleadoForm.value;
      if (this.data && this.data.id_empleado) {
        empleadoData.id_empleado = this.data.id_empleado;  
        this.empleadoService.updateEmpleado(this.data.id_empleado,empleadoData).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Empleado actualizado exitosamente");
            this.onNoClick();
          },
          error: (err) => {
            console.log("Error al actualizar proveedor", err);
          }
        });
      } else {
        this.empleadoService.createEmpleado(empleadoData).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito("Empleado creado exitosamente");
            this.empleadoForm.reset();
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
  
}
