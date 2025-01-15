import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent {
 constructor(private dialog: MatDialog) {}

  // Método para abrir el modal con el formulario
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
