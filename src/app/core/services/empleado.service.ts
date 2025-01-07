import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private baseUrl = environment.apiURL + 'empleado';  // URL base de la API
  private empleadosSubject = new BehaviorSubject<any[]>([]); // Sujeto reactivo para los empleados
  empleados$ = this.empleadosSubject.asObservable();
  constructor(private http: HttpClient) { }
  // Obtener todos los empleados
  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(empleados => this.empleadosSubject.next(empleados)) // Actualiza el BehaviorSubject
    );
  }

  // Crear un nuevo empleado
  createEmpleado(empleado: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, empleado).pipe(
      tap(() => this.fetchEmpleados()) // Actualiza la lista de empleados después de crear uno
    );
  }

  // Método privado para refrescar la lista de empleados
  fetchEmpleados(): void {
    this.getEmpleados().subscribe(); // Obtiene los empleados y actualiza el BehaviorSubject
  }

  // Actualizar un empleado existente
  updateEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, empleado).pipe(
      tap(() => this.fetchEmpleados()) // Refresca la lista después de la actualización
    );
  }

  // Eliminar (lógicamente) un empleado
  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchEmpleados()) // Refresca la lista después de la eliminación
    );
  }
}
