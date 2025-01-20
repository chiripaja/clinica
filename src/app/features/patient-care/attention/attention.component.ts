import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnamnesisFormComponent } from './anamnesis-form/anamnesis-form.component';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent {
  private _formBuilder = inject(FormBuilder);
  @ViewChild(AnamnesisFormComponent, { static: false }) anamnesisFormComponent!: AnamnesisFormComponent;


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  ngAfterViewInit() {
    // Ahora podemos acceder a anamnesisFormComponent después de que la vista se haya inicializado
    console.log(this.anamnesisFormComponent); // Verifica si la referencia se asigna correctamente
  }
}
