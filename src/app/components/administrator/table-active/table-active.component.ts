import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { AdministratorService } from '../../../services/administrator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface UserData {
  id: number;
  clave: string;
  name: string;
  email: string;
}

export interface Admin {
  id: number;
  nombre: string;
  paterno: string;
  materno: string;
  clave: string;
  email: string;
}

@Component({
  selector: 'app-table-active',
  templateUrl: './table-active.component.html',
  styleUrls: ['./table-active.component.css']
})
export class TableActiveComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  adminEdit: any;
  emailAdmin: string;
  info: any;
  administradores: any;

  displayedColumns: string[] = ['clave', 'name', 'email', 'opciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private administradorService: AdministratorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validarUsuarioRegistrado();
    this.listarAdministrador();
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

  validarUsuarioRegistrado() {
    this.info = JSON.parse(sessionStorage.getItem('energy-of-water/simple-data-user'));
    this.emailAdmin = this.info.email;
  }

  editar(id: number) {
    this.administradorService.find(id).subscribe(
      res => {
        this.adminEdit = res;
        let respuesta: Admin = {
          id: this.adminEdit.id,
          nombre: this.adminEdit.nombre,
          paterno: this.adminEdit.paterno,
          materno: this.adminEdit.materno,
          email: this.adminEdit.email,
          clave: this.adminEdit.clave,
        };
        this.form.setValue(respuesta);
      }, error => {
        console.log(error);
      }
    )
  }

  actualizar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.administradorService.actualizar(this.form.value).subscribe(
        res => {
          this.listarAdministrador();
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

  listarAdministrador() {
    this.administradorService.listar().subscribe(
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

  delete(id: number) {
    Swal.fire({
      title: '¿Desea realizar la siguiente operación?',
      text: "Se eliminará el administrador seleccionado",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.delete(id).subscribe(
          res => {
            if (res) {
              Swal.fire(
                '¡Eliminado!',
                'El administrador se ha eliminado.',
                'success'
              )
              this.listarAdministrador();
            }
          }
        );
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