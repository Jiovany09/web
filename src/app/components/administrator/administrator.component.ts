import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministratorService } from '../../services/administrator.service';
import { TableActiveComponent } from './table-active/table-active.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  @ViewChild(TableActiveComponent) table: TableActiveComponent;

  form: FormGroup;
  bandera: boolean = true;

  constructor(private administradorService: AdministratorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
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

  visualizacion(variable: boolean) {
    this.bandera = variable;
  }

  guardar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.administradorService.guardar(this.form.value).subscribe(
        res => {
          this.table.listarAdministrador();
          this.limpiar();
        }, error => {
          Swal.fire({
            icon: 'question',
            title: 'Ops',
            text: 'Algo salió mal, intentalo más tarde',
          });
        }
      )
    }
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
