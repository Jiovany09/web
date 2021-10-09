import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { GeneratorService } from '../../../services/generator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface UserData {
  id: number;
  generator: string;
  estado: boolean;
  serial: string;
}

export interface Generator {
  id: number;
  serial: string;
}

@Component({
  selector: 'app-table-active-generator',
  templateUrl: './table-active-generator.component.html',
  styleUrls: ['./table-active-generator.component.css']
})
export class TableActiveGeneratorComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  generadorEdit: any;
  generadores: any;

  displayedColumns: string[] = ['generator', 'serial', 'estatus', 'opciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private generatorService: GeneratorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listarGeneradores();
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [],
      serial:
        ['',
          [
            Validators.required,
            Validators.pattern(/^[A-ZÁÉÍÓÚÑa-záéíóúñü1234567890 ]+$/),
            Validators.minLength(15),
            Validators.maxLength(20)
          ]
        ]
    });
  }

  editar(id: number) {
    this.generatorService.find(id).subscribe(
      res => {
        this.generadorEdit = res;
        let respuesta: Generator = {
          id: this.generadorEdit.id,
          serial: this.generadorEdit.serial
        };
        this.form.setValue(respuesta);
      }, error => {
        console.log(error);
      }
    )
  }

  actualizar(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      this.generatorService.actualizar(this.form.value).subscribe(
        res => {
          this.listarGeneradores();
          this.limpiar();
          Swal.fire({
            icon: 'success',
            title: 'Editado',
            text: 'Se guardó correctamente la información'
          })
        }, error => {
          console.log(error);
            Swal.fire({
              icon: 'question',
              title: 'Ops',
              text: 'Algo salió mal, intentalo más tarde',
            });
        }
      )
    }
  }

  listarGeneradores() {
    this.generatorService.listar().subscribe(
      res => {
        this.generadores = res;
        let largo = this.generadores.length;

        const generator = Array.from({ length: largo }, (_, k) => createGenerator(
          this.generadores[k].id,
          this.generadores[k].generador,
          this.generadores[k].estado,
          this.generadores[k].serial
        ));
        this.dataSource = new MatTableDataSource(generator);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {

      }
    )
  }

  encendidoApagado(id: number) {
    this.generatorService.activacion(id).subscribe(
      res => {
        this.listarGeneradores();
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

  delete(id: number) {
    Swal.fire({
      title: '¿Desea realizar la siguiente operación?',
      text: "Se eliminará el generador seleccionado",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generatorService.delete(id).subscribe(
          res => {
            if (res) {
              Swal.fire(
                '¡Eliminado!',
                'El generador se ha eliminado.',
                'success'
              )
              this.listarGeneradores();
            }
          }, error => {
            console.log(error);
          }
        )
      }
    })
  }

  limpiar() {
    this.buildForm();
  }

  get serial() {
    return this.form.get('serial');
  }

  get serialInvalid() {
    return this.serial.touched && this.serial.invalid;
  }

}

function createGenerator(id: number, generador: string, estado: boolean, serial: string) {
  return {
    id: id,
    generator: generador,
    estado: estado,
    serial: serial
  }
}
