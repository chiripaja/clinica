import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LotesService } from '../../../../core/services/lotes.service';
import { MovimientosService } from '../../../../core/services/movimientos.service';
@Component({
  selector: 'app-movimientos-table',
  templateUrl: './movimientos-table.component.html',
  styleUrls: ['./movimientos-table.component.scss']
})
export class MovimientosTableComponent {

  displayedColumns: string[] = [
    'id_movimiento',
    'Almacen',
    'tipo_movimiento',
    'Medicamento',
    'Lote',
    'Proveedor',
    'cantidad',
    'precio_venta',
    'precio_compra'
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() openFormDialog = new EventEmitter<void>();
  movimientosService = inject(MovimientosService);

  ngOnInit(): void {
    this.cargarMovimientos()
  }
  cargarMovimientos() {
    this.movimientosService.movimientos$.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.movimientosService.fetchmovimientos();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
