import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';

export interface UserData {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-table-eliminate-user',
  templateUrl: './table-eliminate-user.component.html',
  styleUrls: ['./table-eliminate-user.component.css']
})
export class TableEliminateUserComponent implements OnInit, AfterViewInit {

  users: any;

  displayedColumns: string[] = ['name', 'email', 'opciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.listarUsuariosEliminados();
  }

  listarUsuariosEliminados() {
    this.usersService.listarEliminados().subscribe(
      resp => {
        this.users = resp;
        let largo = this.users.length;

        const users = Array.from({ length: largo }, (_, k) => createNewUser(
          this.users[k].id,
          this.users[k].nombre,
          this.users[k].paterno,
          this.users[k].materno,
          this.users[k].email));
        this.dataSource = new MatTableDataSource(users);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);

      }
    )
  }

  ngAfterViewInit(): void { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reestablecer(id: number) {
    Swal.fire({
      title: '¿Desea realizar la siguiente operación?',
      text: "Se restaurará la siguiente información",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.restaurar(id).subscribe(
          resp => {
            if (resp) {
              Swal.fire(
                '¡Restaurado!',
                'El usuario se ha restaurado en la base de datos.',
                'success'
              )
              this.listarUsuariosEliminados();
            }
          }, error => {
            console.log(error);
          }
        ) 
      }
    })
  }
}

function createNewUser(id: number, nombre: string, paterno: string, materno: string, email: string) {
  if (materno == null) {
    return {
      id: id,
      name: `${nombre} ${paterno}`,
      email: email
    }
  } else {
    return {
      id: id,
      name: `${nombre} ${paterno} ${materno}`,
      email: email
    }
  }
}