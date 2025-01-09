import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogsFormComponent } from '../../components/catalogs-form/catalogs-form.component';

@Component({
  selector: 'app-register-catalogs',
  templateUrl: './register-catalogs.component.html',
  styleUrls: ['./register-catalogs.component.scss']
})
export class RegisterCatalogsComponent {
  constructor(private dialog: MatDialog) {}

  // Método para abrir el modal con el formulario
  openFormDialog(element?:any): void {

    const dialogRef = this.dialog.open(CatalogsFormComponent, {
      width: '500px',  // Ancho del modal
      data: element // Puedes pasar datos al formulario si es necesario
    });

    

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      // Aquí puedes manejar lo que sucede después de cerrar el modal
    });
  }
}
