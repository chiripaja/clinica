import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesFormComponent } from '../../components/employees-form/employees-form.component';
@Component({
  selector: 'app-register-employees',
  templateUrl: './register-employees.component.html',
  styleUrls: ['./register-employees.component.scss']
})
export class RegisterEmployeesComponent {
  dialog = inject(MatDialog)
  openFormDialog(element?: any): void {
 
    const dialogRef = this.dialog.open(EmployeesFormComponent, {
      width: '500px',  // Ancho del modal
      data: element // Puedes pasar datos al formulario si es necesario
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      // Aquí puedes manejar lo que sucede después de cerrar el modal
    });
  }

}
