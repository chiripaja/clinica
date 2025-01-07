import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  
  displayedColumns: string[] = ['id_empleado', 'primerNombre', 'dni', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() openFormDialog = new EventEmitter<void>(); 
  empleadoService=inject(EmpleadoService)
 

  openDialog(element:any): void {
    
    this.openFormDialog.emit(element);  
  }
  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.empleadoService.empleados$.subscribe((empleados: any[]) => {
      this.dataSource.data = empleados;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.empleadoService.fetchEmpleados();
  }


  // Filtrar los empleados
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
