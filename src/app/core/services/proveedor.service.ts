import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private baseUrl = environment.apiURL + 'proveedor';   

  constructor(private http: HttpClient) {}

  // Obtener todos los proveedores
  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Crear un proveedor
  createProveedor(proveedor: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, proveedor);
  }

  // Actualizar un proveedor
  updateProveedor(id: number, proveedor: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, proveedor);
  }

  // Eliminar (lógico) un proveedor
  deleteProveedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
