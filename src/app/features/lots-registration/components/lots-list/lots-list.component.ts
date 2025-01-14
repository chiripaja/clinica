import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsweetService } from '../../../../core/services/alertsweet.service';
import { MedicamentosService } from '../../../../core/services/medicamentos.service';
import { LotesService } from '../../../../core/services/lotes.service';
@Component({
  selector: 'app-lots-list',
  templateUrl: './lots-list.component.html',
  styleUrls: ['./lots-list.component.scss']
})
export class LotsListComponent {
  constructor() {}
  alertsweetService=inject(AlertsweetService);
  displayedColumns: string[] = [
    'id_lote',
    'id_medicamento',
    'numero_lote',
    'fecha_fabricacion',
    'fecha_vencimiento',
    'cantidad_inicial',
    'cantidad_actual',
    'id_almacen',
    'precio_compra_lote'
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() openFormDialog = new EventEmitter<void>(); 
  lotesService=inject(LotesService)
  openDialog(element:any): void {
    this.openFormDialog.emit(element);  
  }

  ngOnInit(): void {
    this.cargarProveedores();
  }
  cargarProveedores() {
    this.lotesService.lotes$.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.lotesService.fetchLotes();
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
        this.lotesService.deleteLotes(id).subscribe({
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
