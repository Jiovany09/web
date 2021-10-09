import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { GeneratorService } from '../../../services/generator.service';

export interface UserData {
  id: number;
  generator: string;
  serial: string;
}

@Component({
  selector: 'app-table-eliminate-generator',
  templateUrl: './table-eliminate-generator.component.html',
  styleUrls: ['./table-eliminate-generator.component.css']
})
export class TableEliminateGeneratorComponent implements OnInit, AfterViewInit {

  generadores: any;
  displayedColumns: string[] = ['generator', 'serial', 'estatus', 'opciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private generatorService: GeneratorService) { }

  ngOnInit(): void {
    this.listarGeneradoresEliminados();
  }

  listarGeneradoresEliminados() {
    this.generatorService.listarEliminados().subscribe(
      res => {
        this.generadores = res;
        let largo = this.generadores.length;

        const generator = Array.from({ length: largo }, (_, k) => createGenerator(
          this.generadores[k].id,
          this.generadores[k].generador,
          this.generadores[k].serial
        ));
        this.dataSource = new MatTableDataSource(generator);

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
        this.generatorService.restaurar(id).subscribe(
          res => {
            if (res) {
              Swal.fire(
                '¡Restaurado!',
                'El generador se ha restaurado en la base de datos.',
                'success'
              );
              this.listarGeneradoresEliminados();
            }
          }
        );
      }
    });
  }
}

function createGenerator(id: number, generador: string, serial: string) {
  return {
    id: id,
    generator: generador,
    serial: serial
  }
}
