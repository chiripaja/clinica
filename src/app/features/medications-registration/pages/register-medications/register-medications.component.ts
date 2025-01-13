import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicationsFormComponent } from '../../components/medications-form/medications-form.component';

@Component({
  selector: 'app-register-medications',
  templateUrl: './register-medications.component.html',
  styleUrls: ['./register-medications.component.scss']
})
export class RegisterMedicationsComponent {
  constructor(private dialog: MatDialog) { }
  openFormDialog(element?: any): void {
    const dialogRef = this.dialog.open(MedicationsFormComponent, {
      width: '500px',  // Ancho del modal
      data: element // Puedes pasar datos al formulario si es necesario
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      // Aquí puedes manejar lo que sucede después de cerrar el modal
    });
  }
}
