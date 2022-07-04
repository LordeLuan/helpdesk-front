import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TecnicoService } from "./../../../services/tecnico.service";
import { Tecnico } from "./../../../models/tecnico";
import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

 tecnico: Tecnico = {
   id: "",
   nome: "",
   cpf: "",
   email: "",
   senha: "",
   perfis: [],
   dataCriacao: "",
 };

 perfilAdmin: boolean;

 constructor(
   private service: TecnicoService,
   private toast: ToastrService,
   private router: Router,
   private activatedRoute: ActivatedRoute
 ) {}

 ngOnInit(): void {
   this.tecnico.id = this.activatedRoute.snapshot.paramMap.get("id");
   this.findById();
 }

 findById() {
   this.service.fingById(this.tecnico.id).subscribe((response) => {
     // Zera a lista de perfis da resposta do método
     response.perfis = [];
     this.tecnico = response;
   });
 }

 delete() {
   this.service.delete(this.tecnico.id).subscribe(
     (response) => {
       this.toast.success("Técnico deletado com sucesso", "Deletar");
       this.router.navigate(["tecnicos"]);
     },
     //Em caso de exceção
     (ex) => {
       // Se a mensagem de exeção tiver o array erros, será enviado a mensagem do array no toast
       if (ex.error.erros) {
         ex.error.errors.array.forEach((element) => {
           this.toast.error(element.message, "Deletar");
         });
       } else {
         // envia a mensagem do campo erro
         this.toast.error(ex.error.message);
       }
     }
   );
 }

}
