import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LotesService } from '../../../../core/services/lotes.service';
@Component({
  selector: 'app-lotes-table',
  templateUrl: './lotes-table.component.html',
  styleUrls: ['./lotes-table.component.scss']
})
export class LotesTableComponent {

  displayedColumns: string[] = [
    'Almacen',
    'numero_lote',
    'Medicamento',
    'fecha_fabricacion',
    'fecha_vencimiento',
    'cantidad_actual',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() openFormDialog = new EventEmitter<void>();
  LotesService = inject(LotesService);

  ngOnInit(): void {
    this.cargarStock()
    
  }
  cargarStock() {
    this.LotesService.lotes$.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.LotesService.fetchLotes();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
