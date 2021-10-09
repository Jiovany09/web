import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersModule } from '../modules/users/users.module';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  listar() {
    return this.http.get(`${this.url}listEmployee`);
  }

  listarEliminados() {
    return this.http.get(`${this.url}listEmployeeEliminate`);
  }

  guardar(empleados: UsersModule) {
    return this.http.post(`${this.url}createEmployee`, empleados);
  }

  actualizar(empleados: UsersModule) {
    return this.http.put(`${this.url}edit/${empleados.id}`, empleados);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}delete/${id}`);
  }

  restaurar(id: number) {
    return this.http.get(`${this.url}restore/${id}`);
  }

  find(id: number) {
    return this.http.get(`${this.url}findUser/${id}`);
  }
}
