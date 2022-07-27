import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private authService: AuthenticationService, private toast:ToastrService) { }

  ngOnInit(): void {
    // Navega para a rota home - rota filha da navbar
    this.router.navigate(['home'])
  }

  logout(){
    this.router.navigate(['login']);
    // Chama o método para limpar as info no localStorage
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout',{timeOut: 5000});
  }

}
