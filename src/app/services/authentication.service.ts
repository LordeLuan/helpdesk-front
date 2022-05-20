import { Credenciais } from './../models/credenciais';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtService : JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(creds : Credenciais){
    return this.http.post(`${environment.urlAPI}/login`, creds , {
      observe: 'response',
      responseType: 'text'
    });
  }

  succesfulLogin(authToken : string){
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(){

    // pega o token que foi setado no localStorage
    let token = localStorage.getItem('token');
    // Verifica se o token está inspirado
    if(token != null){
      return !this.jwtService.isTokenExpired(token);
    }

    return false;
  }

  // Limpa as informações de authenticação que constam no localStorage
  logout(){
    localStorage.clear();
  }

}
