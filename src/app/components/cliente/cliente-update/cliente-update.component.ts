import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ClienteService } from "../../../services/cliente.service";
import { Cliente } from "../../../models/cliente";
import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cliente-update",
  templateUrl: "./cliente-update.component.html",
  styleUrls: ["./cliente-update.component.css"],
})
export class ClienteUpdateComponent implements OnInit {
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

  update() {
    this.service.update(this.cliente).subscribe(
      (response) => {
        this.toast.success("Cliente atualizado com sucesso", "Atualizar");
        this.router.navigate(["clientes"]);
      },
      //Em caso de exceção
      (ex) => {
        // Se a mensagem de exeção tiver o array erros, será enviado a mensagem do array no toast
        if (ex.error.erros) {
          ex.error.errors.array.forEach((element) => {
            this.toast.error(element.message, "Cadastro");
          });
        } else {
          // envia a mensagem do campo erro
          this.toast.error(ex.error.message);
        }
      }
    );
  }

  verificaPerfilADMIN(cliente: Cliente): boolean {
    if (this.cliente.perfis.includes("ADMIN")) {
      this.perfilAdmin = true;
      return true;
    }
    this.perfilAdmin = false;
    return false;
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
