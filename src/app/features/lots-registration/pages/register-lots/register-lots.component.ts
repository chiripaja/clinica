import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LotsFormComponent } from '../../components/lots-form/lots-form.component';

@Component({
  selector: 'app-register-lots',
  templateUrl: './register-lots.component.html',
  styleUrls: ['./register-lots.component.scss']
})
export class RegisterLotsComponent {
  constructor(private dialog: MatDialog) { }
    openFormDialog(element?: any): void {
      const dialogRef = this.dialog.open(LotsFormComponent, {
        width: '500px',  // Ancho del modal
        data: element // Puedes pasar datos al formulario si es necesario
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('El modal fue cerrado');
        // Aquí puedes manejar lo que sucede después de cerrar el modal
      });
    }
}
