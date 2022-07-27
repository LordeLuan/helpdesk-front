import { ActivatedRoute } from '@angular/router';
import { Tecnico } from './../../../models/tecnico';
import { Cliente } from './../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from './../../../services/chamado.service';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  chamado : Chamado = {};

  constructor(private chamadoService: ChamadoService,
     private toasterService: ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(){
    this.chamadoService.findById(this.chamado.id).subscribe(resposta =>{
      this.chamado = resposta;
    }, (ex) =>{
      this.toasterService.error(ex.error.erros);
    })
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
        return 'Média'
      } else{
        return 'Alta'
      }
  }

}
