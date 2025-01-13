import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsweetService } from '../../../../core/services/alertsweet.service';
import { MedicamentosService } from '../../../../core/services/medicamentos.service';
@Component({
  selector: 'app-medications-list',
  templateUrl: './medications-list.component.html',
  styleUrls: ['./medications-list.component.scss']
})
export class MedicationsListComponent {
  constructor() {}
  alertsweetService=inject(AlertsweetService);
  displayedColumns: string[] = [
    'id_medicamento',
    'nombre',
    'descripcion',
    'presentacion',
    'unidad_medida',
    'precio_compra',
    'precio_venta'
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() openFormDialog = new EventEmitter<void>(); 
  medicamentosService=inject(MedicamentosService);
  openDialog(element:any): void {
    this.openFormDialog.emit(element);  
  }

  ngOnInit(): void {
    this.cargarProveedores();
  }
  cargarProveedores() {
    this.medicamentosService.medicamentos$.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.medicamentosService.fetchMedicamento();
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
        this.medicamentosService.deleteMedicamento(id).subscribe({
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
