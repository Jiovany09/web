import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneratorService } from '../../services/generator.service';
import { TableActiveGeneratorComponent } from './table-active-generator/table-active-generator.component';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  @ViewChild(TableActiveGeneratorComponent) table: TableActiveGeneratorComponent;

  form: FormGroup;
  bandera: boolean = true;

  constructor(private generatorService: GeneratorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
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
        ]
    });
  }

  visualizacion(variable: boolean) {
    this.bandera = variable;
  }

  agregar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.generatorService.guardar(this.form.value).subscribe(
        res => {
          this.table.listarGeneradores();
          this.limpiar();
        }, error => {
          console.log(error);

        }
      )
    }
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
