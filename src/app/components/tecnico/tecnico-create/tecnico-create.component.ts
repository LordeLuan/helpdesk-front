import { ToastrService } from "ngx-toastr";
import { TecnicoService } from "./../../../services/tecnico.service";
import { Observable } from "rxjs";
import { Tecnico } from "./../../../models/tecnico";
import { FormControl, Validators } from "@angular/forms";
import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-tecnico-create",
  templateUrl: "./tecnico-create.component.html",
  styleUrls: ["./tecnico-create.component.css"],
})
export class TecnicoCreateComponent implements OnInit {
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

  constructor(private service: TecnicoService, private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {}

  create() {
    this.service.create(this.tecnico).subscribe(
      (response) => {
        this.toast.success("Técnico cadastrado com sucesso", "Cadastro");
        this.router.navigate(['tecnicos']);
      },
      (ex) => {
        console.log(ex);
        if (ex.error.erros) {
          ex.error.errors.array.forEach((element) => {
            this.toast.error(element.message, "Cadastro");
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    );
  }

  addPerfil(perfil: any) {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil));
      console.log(this.tecnico.perfis);
    } else {
      this.tecnico.perfis.push(perfil);
      console.log(this.tecnico.perfis);
    }
  }

  // Verifica se os campos estão se acordo com o solicitado
  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
