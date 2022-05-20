import { Tecnico } from './../models/tecnico';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http:HttpClient) { }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${environment.urlAPI}/tecnicos`);
  }

  create(tecnico:Tecnico) : Observable<Tecnico>{
    return this.http.post<Tecnico>(`${environment.urlAPI}/tecnicos`,tecnico);
  }

}
