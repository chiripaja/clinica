import { Component, inject, ViewChild } from '@angular/core';
import { ServiciosService } from '../../../core/services/servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtencionService } from '../../../core/services/atencion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsweetService } from '../../../core/services/alertsweet.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  filtroForm: FormGroup;
  serviciosService = inject(ServiciosService);
  atencionService = inject(AtencionService);
  alertsweetService=inject(AlertsweetService);

  serviciosSelect: any[] = [];

  constructor(private fb: FormBuilder,private router: Router) {
    this.filtroForm = this.fb.group({
      idservicio: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });
    
  }

  ngOnInit(): void {
    this.serviciosService.getServicio().subscribe(data => {
      this.serviciosSelect = data
    })
  }

  displayedColumns: string[] = [
    'FechaIngreso',
    'servicio',
    'paciente',
    'nrodocumento',
    'celular',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  onSubmit(): void {
    if (this.filtroForm.valid) {
      this.atencionService.getAtencionsByFechasAndIdservicio(this.filtroForm.value).subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          this.alertsweetService.mostrarInformacion("No se encontraron pacientes para esa fecha y esa especialidad")
          this.dataSource.data = []
        }
      });
      
  }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  atender=(data:any)=>{

    const id = data?.IdAtencion;
    this.router.navigate(['/admin/atenciones',id ]);
  }

  hasData(): boolean {
    return this.dataSource.data && this.dataSource.data.length > 0;
  }

}
