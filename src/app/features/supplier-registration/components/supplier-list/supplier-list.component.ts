import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import { AlertsweetService } from '../../../../core/services/alertsweet.service';
@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {
  constructor() {}
  alertsweetService=inject(AlertsweetService);
  displayedColumns: string[] = [
    'id_proveedor',
    'nombre_proveedor',
    'ruc',
    'direccion',
    'telefono',
    'email',
    'tipo_proveedor',
    'observaciones',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() openFormDialog = new EventEmitter<void>(); 
  proveedorService=inject(ProveedorService)

  openDialog(element:any): void {
    this.openFormDialog.emit(element);  
  }

  ngOnInit(): void {
    this.cargarProveedores();
  }
  cargarProveedores() {
    this.proveedorService.proveedores$.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.proveedorService.fetchProveedores();
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
        this.proveedorService.deleteProveedor(id).subscribe({
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
