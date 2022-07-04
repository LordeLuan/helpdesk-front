import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  // Recebe as informações da requisição de findAll
  ELEMENT_DATA: Cliente[] = []

  // Colunas mostradas na tabela
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  // Dados das colunas da tabela
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service : ClienteService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Cliente>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  // pega o valor digitado no campo de filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Chama o metodo para filtrar nos dados da nossa tabela antes, tira espaço em branco e tudo fica caixa baixa
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
