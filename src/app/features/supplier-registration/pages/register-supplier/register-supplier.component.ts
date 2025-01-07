import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupplierFormComponent } from '../../components/supplier-form/supplier-form.component';
@Component({
  selector: 'app-register-supplier',
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.scss']
})
export class RegisterSupplierComponent {
  constructor(private dialog: MatDialog) {}

  // Método para abrir el modal con el formulario
  openFormDialog(element?:any): void {

    const dialogRef = this.dialog.open(SupplierFormComponent, {
      width: '500px',  // Ancho del modal
      data: element // Puedes pasar datos al formulario si es necesario
    });

    

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      // Aquí puedes manejar lo que sucede después de cerrar el modal
    });
  }
}
