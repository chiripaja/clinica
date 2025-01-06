import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {
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

  constructor(private proveedorService: ProveedorService) {}
  ngOnInit(): void {
    this.cargarProveedores();
  }
  cargarProveedores() {
    this.proveedorService.getProveedores().subscribe((data) => {
      console.log(data)
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
