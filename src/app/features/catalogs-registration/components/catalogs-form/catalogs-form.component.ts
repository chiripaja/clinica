import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogs-form',
  templateUrl: './catalogs-form.component.html',
  styleUrls: ['./catalogs-form.component.scss']
})
export class CatalogsFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CatalogsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      concentracion: [''],
      presentacion: [''],
      formafarmaceutica: [''],
      laboratorio: [''],
      lote: [''],
      fechavencimiento: [''],
      precioventa: [0],
      stock: [0],
      estado: [true], // Por defecto "Activo"
      tiposervicio: [1, Validators.required], // Valor predeterminado: Farmacia
    });
  }

  ngOnInit(): void {
    // Si hay datos, los cargamos en el formulario para editar
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // Devolvemos los datos al cerrar
    }
  }
}
