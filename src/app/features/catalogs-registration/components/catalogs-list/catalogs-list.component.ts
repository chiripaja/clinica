import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogosService } from '../../../../core/services/catalogos.service';

@Component({
  selector: 'app-catalogs-list',
  templateUrl: './catalogs-list.component.html',
  styleUrls: ['./catalogs-list.component.scss']
})
export class CatalogsListComponent {
 displayedColumns: string[] = ['nombre', 'laboratorio', 'lote', 'fechavencimiento', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() openFormDialog = new EventEmitter<void>(); 
  catalogosService=inject(CatalogosService)

  ngOnInit(): void {
    this.loadEmployees()
  }
  loadEmployees(): void {
    this.catalogosService.catalogos$.subscribe((empleados: any[]) => {
  
      this.dataSource.data = empleados;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.catalogosService.fetchCatalogo();
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(element:any): void {
    this.openFormDialog.emit(element);  
  }
}
