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
  
  ELEMENT_DATA: Chamado[] = [
    {
      id: 1,
      dataAbertura: '21/06/2022', 
      dataFechamento: '23/06/2022', 
      prioridade: 'ALTA',
      status: 'ANDAMENTO',
      titulo: 'Remover acesso',
      observacoes: 'Remover acesso do usuário XYP',
      tecnico: 1,
      cliente: 6,
      nomeCliente: 'Luan Lordello',
      nomeTecnico: 'Albert Esteein'
  }
]

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico','dataAbertura', 'prioridade' , 'status' , 'acoes']
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }



   // pega o valor digitado no campo de filtro
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Chama o metodo para filtrar nos dados da nossa tabela antes, tira espaço em branco e tudo fica caixa baixa
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
