import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private baseUrl = environment.apiURL + 'factCatalogoBienesInsumos';  // URL base de la API
  private catalogosSubject = new BehaviorSubject<any[]>([]); // Sujeto reactivo para los empleados
  catalogos$ = this.catalogosSubject.asObservable();
  constructor(private http: HttpClient) { }
   // Obtener todos los catalogos
   getCatalogo(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(catalogos => this.catalogosSubject.next(catalogos)) // Actualiza el BehaviorSubject
    );
  }

  // Crear un nuevo empleado
  createCatalogo(catalogos: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, catalogos).pipe(
      tap(() => this.fetchCatalogo()) // Actualiza la lista de empleados después de crear uno
    );
  }

  fetchCatalogo(): void {
    this.getCatalogo().subscribe(); 
  }

 
  updateCatalogo(id: number, catalogo: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, catalogo).pipe(
      tap(() => this.fetchCatalogo()) 
    );
  }

  deleteCatalogo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchCatalogo()) 
    );
  }
}
