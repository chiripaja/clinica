import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../../../../core/services/servicios.service';
import { PacienteService } from '../../../../core/services/paciente.service';
import { TipogeneralService } from '../../../../core/services/tipogeneral.service';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { PatientFormComponent } from 'src/app/features/patient-registration/components/patient-form/patient-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AtencionService } from '../../../../core/services/atencion.service';
import { AlertsweetService } from 'src/app/core/services/alertsweet.service';
@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss']
})


export class AdmissionFormComponent {
  atencionForm: FormGroup;
  buscarForm: FormGroup;
  serviciosService=inject(ServiciosService);
  tipogeneralService=inject(TipogeneralService);
  pacienteService=inject(PacienteService);
  empleadoService=inject(EmpleadoService);
  atencionService=inject(AtencionService);
  alertsweetService = inject(AlertsweetService);
  paciente: any | null = null;
  errorMessage: string | null = null;
  serviciosSelect:any[]=[];
  medicosSelect:any[]=[]
  fuentefinanciamientoSelect:any[]=[];
  tiposervicio:any[]=[
    {id:1,descripcion:'Consultorios Externos'},
    {id:2,descripcion:'Consultorios de Emergencia'},
    {id:3,descripcion:'Hospitalización '},
    {id:4,descripcion:'Observación Emergencia'},
    {id:5,descripcion:'Ayuda al diagnóstico y Tratamiento'},
    {id:6,descripcion:'Programas  Nacionales de Salud'},
    {id:7,descripcion:'Apoyo Asistencial'},
    {id:8,descripcion:'Procedimientos'},
  ]
  constructor(private fb: FormBuilder,private dialog: MatDialog) {
    this.atencionForm = this.fb.group({
      IdPaciente: ['', [Validators.required]],
      FechaIngreso: ['', [Validators.required]],
      IdServicioIngreso: ['', [Validators.required]],
      IdMedicoIngreso: ['', [Validators.required]],
      idFuenteFinanciamiento: ['', [Validators.required]],
      IdTipoServicio: ['', [Validators.required]],
     
    });
    this.buscarForm = this.fb.group({
      nroDocumento: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.serviciosService.getServicio().subscribe(data=>{
      this.serviciosSelect=data
    })
    this.tipogeneralService.getFF().subscribe(data=>{
      this.fuentefinanciamientoSelect=data
    })
    this.empleadoService.getEmpleados().subscribe(data=>{
      this.medicosSelect=data
    })
    
  }

  onSubmit() {
    if (this.atencionForm.valid) {
      console.log('Formulario válido:', this.atencionForm.value);
      this.atencionService.createAtencion(this.atencionForm.value).subscribe({
        next: (response) => {
          this.alertsweetService.mostrarInformacion(`Numero de cuenta: ${response?.IdAtencion}`);
          this.atencionForm.reset();
        },
        error: (err) => {
          console.log("Error al crear la admision", err);
        }
      })
      // Aquí se puede enviar la información al backend usando HTTP
    } else {
      console.log('Formulario inválido');
    }
  }

  buscarPaciente(): void {
    const nroDocumento = this.buscarForm.get('nroDocumento')?.value;
    if (nroDocumento) {
      this.pacienteService.buscarPorNroDocumento(nroDocumento).subscribe({
        next: (data) => {
          this.atencionForm.patchValue({ IdPaciente: data.IdPaciente });
          this.paciente = data;
          this.errorMessage = null;
        },
        error: (error) => {
          this.paciente = null;
          console.log(this.paciente)
          this.errorMessage = error.message;
        }
      });
    }
  }

  resetearDatospx=()=>{
    this.paciente = null;
  }

  openFormDialog(element?:any): void {
      const dialogRef = this.dialog.open(PatientFormComponent, {
        width: '500px',  // Ancho del modal
        data: element // Puedes pasar datos al formulario si es necesario
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('El modal fue cerrado');
        // Aquí puedes manejar lo que sucede después de cerrar el modal
      });
    }



}
