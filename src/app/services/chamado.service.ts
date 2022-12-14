import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Chamado } from './../models/chamado';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${environment.urlAPI}/chamados`);
  }

  findById(id:any): Observable<Chamado>{
    return this.http.get<Chamado>(`${environment.urlAPI}/chamados/${id}`);
  }

  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${environment.urlAPI}/chamados`, chamado);
  }

  update(chamado: Chamado): Observable<Chamado>{
    return this.http.put<Chamado>(`${environment.urlAPI}/chamados/${chamado.id}`,chamado);
  }
}
