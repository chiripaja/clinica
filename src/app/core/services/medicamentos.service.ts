import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  private baseUrl = environment.apiURL + 'medicamentos';
  private medicamentosSubject = new BehaviorSubject<any[]>([]);
  medicamentos$ = this.medicamentosSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todos los medicamentos
  getMedicamento(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => this.medicamentosSubject.next(data))
    );
  }

  // Crear un medicamentos
  createMedicamento(proveedor: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, proveedor).pipe(
      tap(() => this.fetchMedicamento()) 
    );
  }
  fetchMedicamento(): void {
    this.getMedicamento().subscribe(); // Esto dispara el next en el BehaviorSubject
  }

  // Actualizar un medicamentos
  updateMedicamento(id: number, proveedor: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, proveedor).pipe(
      tap(() => this.fetchMedicamento()) 
    );
  }

  // Eliminar (lógico) un medicamentos
  deleteMedicamento(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchMedicamento()) 
    );
  }
}
