import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private baseUrl = environment.apiURL + 'pacientes';
  private pacientesSubject = new BehaviorSubject<any[]>([]);
  pacientes$ = this.pacientesSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todos los pacientes
  getPaciente(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => this.pacientesSubject.next(data))
    );
  }

  // Crear un pacientes
  createPaciente(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      tap(() => this.fetchPaciente()) 
    );
  }
  fetchPaciente(): void {
    this.getPaciente().subscribe(); // Esto dispara el next en el BehaviorSubject
  }

  // Actualizar un pacientes
  updatePaciente(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      tap(() => this.fetchPaciente()) 
    );
  }

  // Eliminar (lógico) un pacientes
  deletePaciente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchPaciente()) 
    );
  }
}
