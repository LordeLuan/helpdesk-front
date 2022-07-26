import { TecnicoService } from './../../../services/tecnico.service';
import { ClienteService } from './../../../services/cliente.service';
import { Tecnico } from './../../../models/tecnico';
import { Cliente } from './../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ChamadoService } from './../../../services/chamado.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  chamado : Chamado = {};

  titulo: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  prioridade: FormControl = new FormControl(null, Validators.required);
  observacoes: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);

  constructor(private chamadoService: ChamadoService,
     private toasterService: ToastrService, private router: Router, private clienteService: ClienteService, private tecnicoService: TecnicoService) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();

  }

  create() {
    this.chamadoService.create(this.chamado).subscribe(
      (response) => {
        this.toasterService.success("Chamado cadastrado com sucesso", "Chamado Cadastrado");
        this.router.navigate(['chamados']);
      },
       //Em caso de exceção
      (ex) => {
        // Se a mensagem de exeção tiver o array erros, será enviado a mensagem do array no toast
        console.log(ex)
        if (ex.error.erros) {
          ex.error.errors.array.forEach((element) => {
            this.toasterService.error(element.message, "Cadastro");
          });
        } else { // envia a mensagem do campo erro 
          this.toasterService.error(ex.error.message);
        }
      }
    );
  }

  findAllClientes(): void{
    this.clienteService.findAll().subscribe(resposta =>{
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void{
    this.tecnicoService.findAll().subscribe(resposta =>{
      this.tecnicos = resposta;
    })
  }

  validaCampos():boolean{
    return this.cliente.valid && this.tecnico.valid && this.observacoes.valid && this.prioridade.valid && this.status.valid && this.titulo.valid;
  }
}
