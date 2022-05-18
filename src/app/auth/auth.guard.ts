import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    
    let authenticated = this.authService.isAuthenticated();

    console.log(authenticated)

    if(authenticated){
      console.log("entrou no if " + authenticated)
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
