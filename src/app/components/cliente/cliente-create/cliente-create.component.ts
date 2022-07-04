import { ToastrService } from "ngx-toastr";
import { ClienteService } from "../../../services/cliente.service";
import { Observable } from "rxjs";
import { Cliente } from "../../../models/cliente";
import { FormControl, Validators } from "@angular/forms";
import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent implements OnInit {
  // Requisitos para preenchimento dos campos
  nome: FormControl = new FormControl(null, Validators.minLength(4));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(6));

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };

  constructor(private service: ClienteService, private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {}

  create() {
    this.service.create(this.cliente).subscribe(
      (response) => {
        this.toast.success("Cliente cadastrado com sucesso", "Cadastro");
        this.router.navigate(['clientes']);
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

  addPerfil(perfil: any) {
    // Se o perfil clicado já existir no array ele será removido, se não ele será adicionado
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil));
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  // Verifica se os campos estão se acordo com o solicitado
  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
