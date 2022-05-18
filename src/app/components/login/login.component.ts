import { AuthenticationService } from './../../services/authentication.service';
import {ToastrService } from 'ngx-toastr';
import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService, private service :AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  logar(){
    this.service.authenticate(this.creds).subscribe(
      response => {
        this.service.succesfulLogin(response.headers.get('Authorization').substring(7));
        this.router.navigate([''])
        console.log(response)
      }, () => {
        this.toast.error('Usuário e/ou senha inválidos');
    })
  }

  validaCampos(): boolean{
    if(this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }

}
