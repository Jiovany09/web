import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UsersModule {
  id: number;
  nombre: string;
  paterno: string;
  materno: string;
  email: string;
  clave: string;
  password: string;
}
