import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = environment.apiURL + 'stock';
  private stockSubject = new BehaviorSubject<any[]>([]);
  stock$ = this.stockSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todos los stock
  getStock(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => this.stockSubject.next(data))
    );
  }

  // Crear un stock
  createStock(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      tap(() => this.fetchStock()) 
    );
  }
  fetchStock(): void {
    this.getStock().subscribe(); // Esto dispara el next en el BehaviorSubject
  }

  // Actualizar un stock
  updateStock(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      tap(() => this.fetchStock()) 
    );
  }

  // Eliminar (lógico) un stock
  deleteStock(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchStock()) 
    );
  }
}
