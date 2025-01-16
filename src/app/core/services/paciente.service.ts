import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
  buscarPorNroDocumento(nroDocumento: string): Observable<any> {
    const url = `${this.baseUrl}/buscarnrodoc/${nroDocumento}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
