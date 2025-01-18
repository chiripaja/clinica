import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private baseUrl = environment.apiURL + 'movimientos';
  private movimientosSubject = new BehaviorSubject<any[]>([]);
  movimientos$ = this.movimientosSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todos los movimientos
  getmovimientos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => this.movimientosSubject.next(data))
    );
  }

  // Crear un movimientos
  createmovimientos(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      tap(() => this.fetchmovimientos()) 
    );
  }
  fetchmovimientos(): void {
    this.getmovimientos().subscribe(); // Esto dispara el next en el BehaviorSubject
  }

  // Actualizar un movimientos
  updatemovimientos(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      tap(() => this.fetchmovimientos()) 
    );
  }

  // Eliminar (lógico) un movimientos
  deletemovimientos(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchmovimientos()) 
    );
  }
}
