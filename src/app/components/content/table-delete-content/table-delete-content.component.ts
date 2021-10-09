import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ContentService } from '../../../services/content.service';

export interface UserData {
  id: number;
  content: string;
  employee: string;
  generator: string;
  serial: string;
}

@Component({
  selector: 'app-table-delete-content',
  templateUrl: './table-delete-content.component.html',
  styleUrls: ['./table-delete-content.component.css']
})
export class TableDeleteContentComponent implements OnInit, AfterViewInit {

  contenedores: any;
  displayedColumns: string[] = ['content', 'employee', 'generator', 'serial', 'estatus', 'opciones']
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.listarContenedoresEliminados();
  }

  listarContenedoresEliminados() {
    this.contentService.listarEliminados().subscribe(
      res => {
        this.contenedores = res;
        let largo = this.contenedores.length;

        const infoContent = Array.from({ length: largo }, (_, k) => createNewContent(
          this.contenedores[k].id,
          this.contenedores[k].contenedor,
          this.contenedores[k].generadores.generador,
          this.contenedores[k].empleados.nombre,
          this.contenedores[k].empleados.paterno,
          this.contenedores[k].empleados.materno,
          this.contenedores[k].serial));
        this.dataSource = new MatTableDataSource(infoContent);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
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
        this.contentService.restaurar(id).subscribe(
          res => {
            if (res) {
              Swal.fire(
                '¡Restaurado!',
                'El cotenedor se ha restaurado en la base de datos.',
                'success'
              )
              this.listarContenedoresEliminados();
            }
          }
        )
      }
    })
  }

}

function createNewContent(id: number, contenedor: string, generador: string, nombre: string, paterno: string, materno: string, serial: string) {
  if (materno == null) {
    return {
      id: id,
      content: contenedor,
      employee: `${nombre} ${paterno}`,
      generator: generador,
      serial: serial
    }
  } else {
    return {
      id: id,
      content: contenedor,
      employee: `${nombre} ${paterno} ${materno}`,
      generator: generador,
      serial: serial
    }
  }
}