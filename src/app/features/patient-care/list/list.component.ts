import { Component, inject } from '@angular/core';
import { ServiciosService } from '../../../core/services/servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtencionService } from '../../../core/services/atencion.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  filtroForm: FormGroup;
  serviciosService = inject(ServiciosService)
  serviciosSelect: any[] = [];
atencionService=inject(AtencionService)
  constructor(private fb: FormBuilder) {

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

  onSubmit(): void {
    if (this.filtroForm.valid) {
      console.log(this.filtroForm.value)
      this.atencionService.getAtencionsByFechasAndIdservicio(this.filtroForm.value).subscribe(data=>{
        console.log(data)
      })
     } else { 
      console.log("no entro")
     }
  }

}
