import { Tecnico } from './../../../models/tecnico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [
    { id: 1,
      nome: "Luan",
      cpf: "123.456.789.-10",
      email: "luan@gmail.com",
      senha: "123",
      perfis: ['0'],
      dataCriacao: "18/05/2022"
    }
  ]

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  // private service: TecnicoService

  ngOnInit(): void {
    // this.findAll();
  }

  // findAll() {
  //   this.service.findAll().subscribe(resposta => {
  //     this.ELEMENT_DATA = resposta
  //     this.dataSource = new MatTableDataSource<Tecnico>(resposta);
  //     this.dataSource.paginator = this.paginator;
  //   })
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
