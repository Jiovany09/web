import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  info: any;
  color: string = 'red';

  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.validarInicioSesion();
    this.buildForm();
  }

  validarInicioSesion() {
    let info = JSON.parse(sessionStorage.getItem('energy-of-water/simple-data-user'));
    if (info) {
      this.router.navigateByUrl('/content/statistics');
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const administrador = this.form.value;
      this.loginService.login(administrador).subscribe(
        resp => {
          this.info = resp;
          if (this.info.data.status == "success") {
            if (this.info.user.tipo == 'administrador') {
              sessionStorage.setItem('energy-of-water/simple-data-user', JSON.stringify(this.info.user));
              sessionStorage.setItem('energy-of-water/information-page',this.info.token);
              this.router.navigateByUrl('/content/statistics');
            } else if (this.info.user.tipo != 'administrador') {
              Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'No tienes permisos para entrar a la aplicación',
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: '¿Son tus datos?',
              text: 'Comprueba la información proporcionada e intentalo de nuevo',
            });
          }
        }, error => {
          Swal.fire({
            icon: 'question',
            title: 'Ops',
            text: 'Algo salió mal, intentalo más tarde',
          });
        }
      )
    } else {
      this.form.markAllAsTouched();
    }
  }

  get email() {
    return this.form.get('email');
  }

  get emailInvalid() {
    return this.email.touched && this.email.invalid;
  }

  get password() {
    return this.form.get('password');
  }

  get passwordInvalid() {
    return this.password.touched && this.password.invalid;
  }

}
