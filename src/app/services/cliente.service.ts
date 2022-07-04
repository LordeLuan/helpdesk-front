import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.urlAPI}/clientes`);
  }

  fingById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.urlAPI}/clientes/${id}`);
  }
  create(Cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.urlAPI}/clientes`, Cliente);
  }

  update(Cliente:Cliente) : Observable<Cliente>{
    return this.http.put<Cliente>(`${environment.urlAPI}/clientes/${Cliente.id}`,Cliente);
  }

  delete(id:any) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${environment.urlAPI}/clientes/${id}`);
  }
}
