import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersModule } from '../modules/users/users.module';
import { global } from './global';
import { Observable } from 'rxjs';
const TIME = 5000; //milisegundos

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  listar() {
    return this.http.get(`${this.url}listAdministrator`);
  }

  listarEliminados() {
    return this.http.get(`${this.url}listAdministratorEliminate`);
  }

  guardar(administradores: UsersModule) {
    return this.http.post(`${this.url}createAdministrator`, administradores);
  }

  actualizar(administradores: UsersModule) {
    return this.http.put(`${this.url}edit/${administradores.id}`, administradores);
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

  infoTiempoReal(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}listInfoTiempoRealGenerador/${id}`);
  }
}
