import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private baseUrl = environment.apiURL + 'recetas';
  private recetasSubject = new BehaviorSubject<any[]>([]);
  recetas$ = this.recetasSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todos los recetas
  getrecetas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => this.recetasSubject.next(data))
    );
  }
  crearRecetasFarmacia(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/farmacia`, data);
  }
  // Crear un recetas
  createrecetas(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      tap(() => this.fetchrecetas()) 
    );
  }
  fetchrecetas(): void {
    this.getrecetas().subscribe(); // Esto dispara el next en el BehaviorSubject
  }

  // Actualizar un recetas
  updaterecetas(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      tap(() => this.fetchrecetas()) 
    );
  }

  // Eliminar (lógico) un recetass
  deleterecetas(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchrecetas()) 
    );
  }
}
