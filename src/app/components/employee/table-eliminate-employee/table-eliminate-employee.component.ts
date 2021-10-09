import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../../services/employee.service';

export interface UserData {
  id: number;
  clave: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-table-eliminate-employee',
  templateUrl: './table-eliminate-employee.component.html',
  styleUrls: ['./table-eliminate-employee.component.css']
})
export class TableEliminateEmployeeComponent implements OnInit, AfterViewInit {

  empleados: any;

  displayedColumns: string[] = ['clave', 'name', 'email', 'opciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private empleadoService: EmployeeService) { }

  ngOnInit(): void {
    this.listarEmpleadosEliminados();
  }

  listarEmpleadosEliminados() {
    this.empleadoService.listarEliminados().subscribe(
      resp => {
        this.empleados = resp;
        let largo = this.empleados.length;

        const users = Array.from({ length: largo }, (_, k) => createNewUser(
          this.empleados[k].id,
          this.empleados[k].clave,
          this.empleados[k].nombre,
          this.empleados[k].paterno,
          this.empleados[k].materno,
          this.empleados[k].email));
        this.dataSource = new MatTableDataSource(users);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {

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
        this.empleadoService.restaurar(id).subscribe(
          resp => {
            if(resp){
              Swal.fire(
                '¡Restaurado!',
                'El empleado se ha restaurado en la base de datos.',
                'success'
              )
              this.listarEmpleadosEliminados();
            }
          }, error => {
            console.log(error);
            
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
