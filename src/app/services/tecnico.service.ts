import { Tecnico } from "./../models/tecnico";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TecnicoService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${environment.urlAPI}/tecnicos`);
  }

  fingById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${environment.urlAPI}/tecnicos/${id}`);
  }
  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${environment.urlAPI}/tecnicos`, tecnico);
  }

  update(tecnico:Tecnico) : Observable<Tecnico>{
    return this.http.put<Tecnico>(`${environment.urlAPI}/tecnicos/${tecnico.id}`,tecnico);
  }

  delete(id:any) : Observable<Tecnico>{
    return this.http.delete<Tecnico>(`${environment.urlAPI}/tecnicos/${id}`);
  }
}
