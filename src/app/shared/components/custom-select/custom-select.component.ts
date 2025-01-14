import { Component, Input , OnInit} from '@angular/core';
import { FormControl } from '@angular/forms'
@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() options: { value: string; label: string }[] = [];
  
  searchControl = new FormControl('');
  filteredOptions: { value: string; label: string }[] = [];
  selectedValue: string | null = null;

  ngOnInit() {
    // Inicializa las opciones filtradas con todas las opciones disponibles
    this.filteredOptions = this.options;

    // Filtra las opciones en tiempo real al escribir en el campo de búsqueda
    this.searchControl.valueChanges.subscribe((query) => {
      const searchTerm = query?.toLowerCase() || ''; // Manejar valores nulos
      this.filteredOptions = this.filterOptions(searchTerm);
    });
  }

  // Método para filtrar las opciones
  filterOptions(searchTerm: string) {
    return this.options.filter(option =>
      option.label.toLowerCase().includes(searchTerm)
    );
  }

  onOptionSelected(value: string) {
    this.selectedValue = value; // Guardar el valor seleccionado
  }
}
