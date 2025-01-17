import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsweetService } from '../../../../core/services/alertsweet.service';
import { PacienteService } from 'src/app/core/services/paciente.service';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
 constructor() {}
  alertsweetService=inject(AlertsweetService);
  displayedColumns: string[] = [
    'ApellidoPaterno',
    'ApellidoMaterno',
    'PrimerNombre',
    'SegundoNombre',
    'FechaNacimiento',
    'NroDocumento',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() openFormDialog = new EventEmitter<void>(); 
 
  pacienteService=inject(PacienteService)
  openDialog(element:any): void {
    console.log(element)
    this.openFormDialog.emit(element);  
  }

  ngOnInit(): void {
    this.cargarProveedores();
  }
  cargarProveedores() {
    this.pacienteService.pacientes$.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.pacienteService.fetchPaciente();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteSupplier=async(id:number)=>{
      const confirmed = await this.alertsweetService.confirmar("¿Desea Eliminar?");
      if (confirmed) {
        this.pacienteService.deletePaciente(id).subscribe({
          next: (response) => {
            this.alertsweetService.mostrarExito('Eliminado Registro');
          },
          error: (err) => {
            console.error('Error al eliminar proveedor:', err);
          }
        });
      } else {
        console.log('Eliminación cancelada');
      }
  }
}
