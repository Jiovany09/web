import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ContentService } from '../../../services/content.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { GeneratorService } from '../../../services/generator.service';

export interface UserData {
  id: number;
  content: string;
  estado: boolean;
  employee: string;
  employee_id: number;
  generator: string;
  generator_id: number;
  serial: string;
}

export interface Content {
  id: number;
  empleado_id: number;
  generador_id: number;
  serial: string;
}

@Component({
  selector: 'app-table-active-content',
  templateUrl: './table-active-content.component.html',
  styleUrls: ['./table-active-content.component.css']
})
export class TableActiveContentComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  contenedores: any;
  contenedorEdit: any;
  empleados: any;
  generadores: any;
  displayedColumns: string[] = ['content', 'employee', 'generator', 'serial', 'estatus', 'opciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contentService: ContentService, private formBuilder: FormBuilder, private employeeService: EmployeeService, private generatorService: GeneratorService) { }

  ngOnInit(): void {
    this.listarContenedores();
    this.buildForm();
    this.employeeService.listar().subscribe(
      res => {
        this.empleados = res;
      }
    );
    this.generatorService.listar().subscribe(
      res => {
        this.generadores = res;
      }
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [],
      serial:
        ['',
          [
            Validators.required,
            Validators.pattern(/^[A-ZÁÉÍÓÚÑa-záéíóúñü1234567890]+$/),
            Validators.minLength(15),
            Validators.maxLength(20)
          ]
        ],
      empleado_id:
        ['',
          [
            Validators.required,
            Validators.pattern(/^[1234567890]+$/)
          ]
        ],
      generador_id:
        ['',
          [
            Validators.required,
            Validators.pattern(/^[1234567890]+$/)
          ]
        ]
    });
  }

  editar(id: number) {
    this.contentService.find(id).subscribe(
      res => {
        this.contenedorEdit = res;
        let respuesta: Content = {
          id: this.contenedorEdit.id,
          generador_id: this.contenedorEdit.generador_id,
          empleado_id: this.contenedorEdit.empleado_id,
          serial: this.contenedorEdit.serial,
        }
        this.form.setValue(respuesta);
      }, error => {
        console.log(error);
      }
    )
  }

  actualizar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.contentService.actualizar(this.form.value).subscribe(
        res => {
          this.listarContenedores();
          this.limpiar();
          Swal.fire({
            icon: 'success',
            title: 'Editado',
            text: 'Se guardó correctamente la información'
          });
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

  listarContenedores() {
    this.contentService.listar().subscribe(
      res => {
        this.contenedores = res;
        let largo = this.contenedores.length;

        const content = Array.from({ length: largo }, (_, k) => createNewContent(
          this.contenedores[k].id,
          this.contenedores[k].contenedor,
          this.contenedores[k].estado,
          this.contenedores[k].generador_id,
          this.contenedores[k].generadores.generador,
          this.contenedores[k].empleado_id,
          this.contenedores[k].empleados.nombre,
          this.contenedores[k].empleados.paterno,
          this.contenedores[k].empleados.materno,
          this.contenedores[k].serial));
        this.dataSource = new MatTableDataSource(content);

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

  encendidoApagado(id: number) {
    this.contentService.activacion(id).subscribe(
      res => {
        this.listarContenedores();
      }, error => {
        console.log(error);
      }
    )
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Desea realizar la siguiente operación?',
      text: "Se eliminará el contenedor seleccionado",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contentService.delete(id).subscribe(
          res => {
            if (res) {
              Swal.fire(
                '¡Eliminado!',
                'El contenedor se ha eliminado.',
                'success'
              )
              this.listarContenedores();
            }
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

  get empleado_id() {
    return this.form.get('empleado_id');
  }

  get empleadoInvalid() {
    return this.empleado_id.touched && this.empleado_id.invalid;
  }

  get generador_id() {
    return this.form.get('generador_id');
  }

  get generadorInvalid() {
    return this.generador_id.touched && this.generador_id.invalid;
  }
}

function createNewContent(id: number, contenedor: string, estado: boolean, generador_id: number, generador: string, empleado_id: number, nombre: string, paterno: string, materno: string, serial: string) {
  if (materno == null) {
    return {
      id: id,
      content: contenedor,
      employee: `${nombre} ${paterno}`,
      employee_id: empleado_id,
      generator: generador,
      generator_id: generador_id,
      estado: estado,
      serial: serial
    }
  } else {
    return {
      id: id,
      content: contenedor,
      employee: `${nombre} ${paterno} ${materno}`,
      employee_id: empleado_id,
      generator: generador,
      generator_id: generador_id,
      estado: estado,
      serial: serial
    }
  }
}