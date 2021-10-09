import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  listar() {
    return this.http.get(`${this.url}listCitizen`);
  }

  listarEliminados() {
    return this.http.get(`${this.url}listCitizenEliminate`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}delete/${id}`);
  }

  restaurar(id: number) {
    return this.http.get(`${this.url}restore/${id}`);
  }
}
