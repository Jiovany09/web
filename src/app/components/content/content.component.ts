import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { TableActiveContentComponent } from './table-active-content/table-active-content.component';
import { EmployeeService } from '../../services/employee.service';
import { GeneratorService } from '../../services/generator.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @ViewChild(TableActiveContentComponent) table: TableActiveContentComponent;

  form: FormGroup;
  bandera: boolean = true;
  empleados: any;
  generadores: any;

  constructor(private contentService: ContentService, private formBuilder: FormBuilder, private employeeService: EmployeeService, private generatorService: GeneratorService) { }

  ngOnInit(): void {
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
        ['Seleccionar',
          [
            Validators.required,
            Validators.pattern(/^[1234567890]+$/)
          ]
        ],
      generador_id:
        ['Seleccionar',
          [
            Validators.required,
            Validators.pattern(/^[1234567890]+$/)
          ]
        ]
    });
  }

  guardar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.contentService.guardar(this.form.value).subscribe(
        res => {
          this.table.listarContenedores();
          this.limpiar();
        }, error => {
          console.log(error);
        }
      )
    }
  }

  visualizacion(variable: boolean) {
    this.bandera = variable;
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
