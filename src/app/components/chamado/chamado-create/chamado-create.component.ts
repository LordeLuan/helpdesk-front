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

  chamado : Chamado = {
    id: 1, 
    dataAbertura: '21/07/2022', 
    dataFechamento:  '21/07/2022',
    prioridade: '1',
    status: '1',
    titulo: 'Sei lá',
    observacoes: 'Sei menos ainda',
    tecnico: 1,
    cliente:1,
    nomeCliente: 'Moacir',
    nomeTecnico: 'Moacir',
  };

  titulo: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  prioridade: FormControl = new FormControl(null, Validators.required);
  descricao: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);

  constructor(private service: ChamadoService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  create() {
    this.service.create(this.chamado).subscribe(
      (response) => {
        this.toast.success("Chamado cadastrado com sucesso", "Cadastro");
        this.router.navigate(['chamados']);
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

  validaCampos():boolean{
    return this.cliente.valid && this.tecnico.valid && this.descricao.valid && this.prioridade.valid && this.status.valid && this.titulo.valid;
  }
}
