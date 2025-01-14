import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LotesService {
  private baseUrl = environment.apiURL + 'lotes';
  private lotesSubject = new BehaviorSubject<any[]>([]);
  lotes$ = this.lotesSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todos los Lotes
  getLotes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => this.lotesSubject.next(data))
    );
  }

  // Crear un Lotes
  createLotes(proveedor: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, proveedor).pipe(
      tap(() => this.fetchLotes()) 
    );
  }
  fetchLotes(): void {
    this.getLotes().subscribe(); // Esto dispara el next en el BehaviorSubject
  }

  // Actualizar un Lotes
  updateLotes(id: number, proveedor: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, proveedor).pipe(
      tap(() => this.fetchLotes()) 
    );
  }

  // Eliminar (lógico) un Lotess
  deleteLotes(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchLotes()) 
    );
  }
}
