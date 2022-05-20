import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    // Adiciona o token na requisição enviada ao back-end
    if(token){
      const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
      return next.handle(cloneReq);
    }else{
      return next.handle(request);

    }
  }
}

// Configura a class para enviar as informações mais clean para o arquivo module
export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]