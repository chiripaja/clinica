import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsweetService } from '../../../../core/services/alertsweet.service';
import { StockService } from '../../../../core/services/stock.service';
@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent {
  alertsweetService = inject(AlertsweetService);
  displayedColumns: string[] = [
    'Almacen',
    'Medicamento',
    'cantidad_disponible',
    'precio_compra',
    'precio_venta'
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() openFormDialog = new EventEmitter<void>();
  stockService = inject(StockService)
  ngOnInit(): void {
    this.cargarStock()
    
  }
  cargarStock() {
    this.stockService.stock$.subscribe((data) => {
      console.log(data)
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.stockService.fetchStock();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
