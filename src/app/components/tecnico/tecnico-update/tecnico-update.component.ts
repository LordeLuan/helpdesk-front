import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from './../../../services/tecnico.service';
import { Tecnico } from './../../../models/tecnico';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
 // Requisitos para preenchimento dos campos
 nome: FormControl = new FormControl(null, Validators.minLength(4));
 cpf: FormControl = new FormControl(null, Validators.required);
 email: FormControl = new FormControl(null, Validators.email);
 senha: FormControl = new FormControl(null, Validators.minLength(6));

 tecnico: Tecnico = {
   id: "",
   nome: "",
   cpf: "",
   email: "",
   senha: "",
   perfis: [],
   dataCriacao: "",
 };

 constructor(private service: TecnicoService, 
            private toast: ToastrService, 
            private router: Router, 
            private activatedRoute:ActivatedRoute) {}

 ngOnInit(): void {
  this.tecnico.id = this.activatedRoute.snapshot.paramMap.get('id');
  this.findById();
 }

 findById(){
  this.service.fingById(this.tecnico.id).subscribe(
    response => {
      // response.perfis = [];
      this.tecnico = response;
    }
  )
 }

 update() {
   this.service.update(this.tecnico).subscribe(
     (response) => {
       this.toast.success('Técnico atualizado com sucesso', 'Atualizar');
       this.router.navigate(['tecnicos']);
     },
      //Em caso de exceção
     (ex) => {
       // Se a mensagem de exeção tiver o array erros, será enviado a mensagem do array no toast
       if (ex.error.erros) {
         ex.error.errors.array.forEach((element) => {
           this.toast.error(element.message, "Cadastro");
         });
       } else { // envia a mensagem do campo erro 
         this.toast.error(ex.error.message);
       }
     }
   );
 }

 verificaPerfilADMIN(tecnico :Tecnico) : boolean{
   
    if(this.tecnico.perfis.includes('ADMIN')){
      return true;
    }

    return false;
 }

 addPerfil(perfil: any) {
   // Se o perfil clicado já existir no array ele será removido, se não ele será adicionado
   if (this.tecnico.perfis.includes(perfil)) {
     this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil));
   } else {
     this.tecnico.perfis.push(perfil);
   }
 }

 // Verifica se os campos estão se acordo com o solicitado
 validaCampos(): boolean {
   return (
     this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
   );
 }
}
