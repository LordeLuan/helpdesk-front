import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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
     private toasterService: ToastrService, private router: Router, private clienteService: ClienteService, private tecnicoService: TecnicoService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findAllClientes();
    this.findAllTecnicos();
    this.findById();
  }

  findById(){
    this.chamadoService.findById(this.chamado.id).subscribe(resposta =>{
      this.chamado = resposta;
    }, (ex) =>{
      this.toasterService.error(ex.error.erros);
    })
  }

  update() {
    this.chamadoService.update(this.chamado).subscribe(
      (response) => {
        this.toasterService.success("Chamado atualizado com sucesso", "Chamado Atualizado");
        this.router.navigate(['chamados']);
      },
       //Em caso de exce????o
      (ex) => {
        // Se a mensagem de exe????o tiver o array erros, ser?? enviado a mensagem do array no toast
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

  retornaStatusString(status: any): string {
    if(status == '0'){
      return 'Aberto'
    } else if(status == '1'){
      return 'Andamento'
    } else{
      return 'Encerrado'
    }
  }

    retornaPrioridadeString(prioridade: any): string {
      if(prioridade == '0'){
        return 'Baixa'
      } else if(prioridade == '1'){
        return 'M??dia'
      } else{
        return 'Alta'
      }
  }
}
