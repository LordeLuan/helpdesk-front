import { ChamadoService } from './../../../services/chamado.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  checked: false;

  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico','dataAbertura', 'prioridade' , 'status' , 'acoes']
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service: ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void{
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

   // pega o valor digitado no campo de filtro
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Chama o metodo para filtrar nos dados da nossa tabela antes, tira espaço em branco e tudo fica caixa baixa
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  ordenaPorStatus(status: any): void{
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status){
        list.push(element);
      }
    })
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }
}
