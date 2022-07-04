import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ClienteService } from "../../../services/cliente.service";
import { Cliente } from "../../../models/cliente";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

 cliente: Cliente = {
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
   private service: ClienteService,
   private toast: ToastrService,
   private router: Router,
   private activatedRoute: ActivatedRoute
 ) {}

 ngOnInit(): void {
   this.cliente.id = this.activatedRoute.snapshot.paramMap.get("id");
   this.findById();
 }

 findById() {
   this.service.fingById(this.cliente.id).subscribe((response) => {
     // Zera a lista de perfis da resposta do método
     response.perfis = [];
     this.cliente = response;
   });
 }

 delete() {
   this.service.delete(this.cliente.id).subscribe(
     (response) => {
       this.toast.success("Cliente deletado com sucesso", "Deletar");
       this.router.navigate(["clientes"]);
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
