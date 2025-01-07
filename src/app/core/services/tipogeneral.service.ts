import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TipogeneralService {
  private baseUrl = environment.apiURL + 'tiposgeneral';
  constructor(private http: HttpClient) { }
  getTipoDocumento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tipodocumento`)
  }
  getTipoSexo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tiposexo`)
  }
}
