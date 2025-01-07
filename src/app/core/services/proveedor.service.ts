import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/app/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private baseUrl = environment.apiURL + 'proveedor';   
  private proveedoresSubject = new BehaviorSubject<any[]>([]);
  proveedores$ = this.proveedoresSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todos los proveedores
  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(proveedores => this.proveedoresSubject.next(proveedores))
    );
  }

  // Crear un proveedor
  createProveedor(proveedor: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, proveedor).pipe(
      tap(() => this.fetchProveedores()) 
    );
  }
  fetchProveedores(): void {
    this.getProveedores().subscribe(); // Esto dispara el next en el BehaviorSubject
  }

  // Actualizar un proveedor
  updateProveedor(id: number, proveedor: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, proveedor).pipe(
      tap(() => this.fetchProveedores()) 
    );
  }

  // Eliminar (lógico) un proveedor
  deleteProveedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchProveedores()) 
    );
  }
}
