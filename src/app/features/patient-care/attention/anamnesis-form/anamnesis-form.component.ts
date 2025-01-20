import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-anamnesis-form',
  templateUrl: './anamnesis-form.component.html',
  styleUrls: ['./anamnesis-form.component.scss']
})
export class AnamnesisFormComponent {
  private fb = inject(FormBuilder);
  anamnesisForm = this.fb.group({
    motivoconsulta: ['', Validators.required],
    examenclinico: ['', Validators.required],
  });
}
