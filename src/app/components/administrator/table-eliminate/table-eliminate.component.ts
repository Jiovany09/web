import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { AdministratorService } from '../../../services/administrator.service';

export interface UserData {
  id: number;
  clave: string;
  name: string;
  email: string;
}

const NAMES: string[] = [
  'Jiovany Rafael',
  'Melissa Rodriguez',
  'Yadira Pereda',
  'Ejemplo Alguien',
];

@Component({
  selector: 'app-table-eliminate',
  templateUrl: './table-eliminate.component.html',
  styleUrls: ['./table-eliminate.component.css']
})
export class TableEliminateComponent implements OnInit, AfterViewInit {

  administradores: any;

  displayedColumns: string[] = ['clave', 'name', 'email', 'opciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private administradorService: AdministratorService) { }

  ngOnInit(): void {
    this.listarAdministradoresEliminados();
  }

  listarAdministradoresEliminados() {
    this.administradorService.listarEliminados().subscribe(
      res => {
        this.administradores = res;
        let largo = this.administradores.length;

        const users = Array.from({ length: largo }, (_, k) => createNewUser(
          this.administradores[k].id,
          this.administradores[k].clave,
          this.administradores[k].nombre,
          this.administradores[k].paterno,
          this.administradores[k].materno,
          this.administradores[k].email));
        this.dataSource = new MatTableDataSource(users);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        this.administradorService.restaurar(id).subscribe(
          res => {
            if (res) {
              Swal.fire(
                '¡Restaurado!',
                'El administrador se ha restaurado en la base de datos.',
                'success'
              )
              this.listarAdministradoresEliminados();
            }
          }
        )
      }
    })
  }

}

function createNewUser(id: number, clave: string, nombre: string, paterno: string, materno: string, email: string) {
  if (materno == null) {
    return {
      id: id,
      clave: clave,
      name: `${nombre} ${paterno}`,
      email: email
    }
  } else {
    return {
      id: id,
      clave: clave,
      name: `${nombre} ${paterno} ${materno}`,
      email: email
    }
  }
}

