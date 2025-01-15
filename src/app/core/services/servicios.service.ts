import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private baseUrl = environment.apiURL + 'servicios';
  private serviciosSubject = new BehaviorSubject<any[]>([]);
  servicios$ = this.serviciosSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todos los servicios
  getServicio(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => this.serviciosSubject.next(data))
    );
  }

  // Crear un servicios
  createServicio(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      tap(() => this.fetchServicio()) 
    );
  }
  fetchServicio(): void {
    this.getServicio().subscribe(); // Esto dispara el next en el BehaviorSubject
  }

  // Actualizar un servicios
  updateServicio(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      tap(() => this.fetchServicio()) 
    );
  }

  // Eliminar (lógico) un servicios
  deleteServicio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchServicio()) 
    );
  }
}
