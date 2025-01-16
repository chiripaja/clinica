import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AtencionService {
  private baseUrl = environment.apiURL + 'atenciones';
  private atencionesSubject = new BehaviorSubject<any[]>([]);
  atenciones$ = this.atencionesSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todos los atenciones
  getAtencion(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => this.atencionesSubject.next(data))
    );
  }

  // Crear un atenciones
  createAtencion(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      tap(() => this.fetchAtencion()) 
    );
  }
  fetchAtencion(): void {
    this.getAtencion().subscribe(); // Esto dispara el next en el BehaviorSubject
  }

  // Actualizar un atenciones
  updateAtencion(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      tap(() => this.fetchAtencion()) 
    );
  }

  // Eliminar (lógico) un atenciones
  deleteAtencion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchAtencion()) 
    );
  }
 
  getAtencionsByFechasAndIdservicio(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/buscar`, data)
  }
  
}
