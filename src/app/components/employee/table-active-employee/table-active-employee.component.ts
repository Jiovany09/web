import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../../services/employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface UserData {
  id: number;
  clave: string;
  name: string;
  email: string;
}

export interface Employee {
  id: number;
  nombre: string;
  paterno: string;
  materno: string;
  clave: string;
  email: string;
}

@Component({
  selector: 'app-table-active-employee',
  templateUrl: './table-active-employee.component.html',
  styleUrls: ['./table-active-employee.component.css']
})
export class TableActiveEmployeeComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  empleados: any;
  empleadoEdit: any;

  displayedColumns: string[] = ['clave', 'name', 'email', 'opciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private empleadoService: EmployeeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listarEmpleado();
    this.buildForm();
  }
  
  private buildForm() {
    this.form = this.formBuilder.group({
      id: [],
      nombre:
        ['',
          [
            Validators.required,
            Validators.pattern(/^[A-ZÁÉÍÓÚÑa-záéíóúñü ]+$/),
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ],
      paterno:
        ['',
          [
            Validators.required,
            Validators.pattern(/^[A-ZÁÉÍÓÚÑa-záéíóúñü]+$/),
            Validators.minLength(3),
            Validators.maxLength(15)
          ]
        ],
      materno:
        ['',
          [
            Validators.pattern(/^[A-ZÁÉÍÓÚÑa-záéíóúñü]+$/),
            Validators.minLength(3),
            Validators.maxLength(15)
          ]
        ],
      clave:
        ['',
          [
            Validators.required,
            Validators.pattern(/^[A-ZÁÉÍÓÚÑ]{3}[1234567890]{3}$/),
          ]
        ],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  editar(id: number){
    this.empleadoService.find(id).subscribe(
      resp => {
        this.empleadoEdit = resp;
        let respuesta: Employee = {
          id: this.empleadoEdit.id,
          nombre: this.empleadoEdit.nombre,
          paterno: this.empleadoEdit.paterno,
          materno: this.empleadoEdit.materno,
          clave: this.empleadoEdit.clave,
          email: this.empleadoEdit.email
        };
        this.form.setValue(respuesta);
      }, error => {
        console.log(error);
      }
    )
  }

  actualizar(event: Event){
    event.preventDefault();
    if (this.form.valid) {
      this.empleadoService.actualizar(this.form.value).subscribe(
        resp => {
          this.listarEmpleado();
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

  listarEmpleado() {
    this.empleadoService.listar().subscribe(
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

  delete(id: number) {
    Swal.fire({
      title: '¿Desea realizar la siguiente operación?',
      text: "Se eliminará el empleado seleccionado",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.delete(id).subscribe(
          resp => {
            if(resp){
              Swal.fire(
                '¡Eliminado!',
                'El empleado se ha eliminado.',
                'success'
              )
              this.listarEmpleado();
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

  get email() {
    return this.form.get('email');
  }

  get emailInvalid() {
    return this.email.touched && this.email.invalid;
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get nombreInvalid() {
    return this.nombre.touched && this.nombre.invalid;
  }

  get paterno() {
    return this.form.get('paterno');
  }

  get paternoInvalid() {
    return this.paterno.touched && this.paterno.invalid;
  }

  get materno() {
    return this.form.get('materno');
  }

  get maternoInvalid() {
    return this.materno.touched && this.materno.invalid;
  }

  get clave() {
    return this.form.get('clave');
  }

  get claveInvalid() {
    return this.clave.touched && this.clave.invalid;
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
