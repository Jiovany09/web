import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private url;

  constructor(private http: HttpClient) { 
    this.url = global.url;
  }

  listar() {
    return this.http.get(`${this.url}listContenedores`);
  }

  listarEliminados() {
    return this.http.get(`${this.url}listContenedoresEliminate`);
  }

  guardar(contenedor: any) {
    return this.http.post(`${this.url}createContenedores`, contenedor);
  }

  actualizar(contenedor: any) {
    return this.http.put(`${this.url}editContenedores/${contenedor.id}`, contenedor);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}deleteContenedores/${id}`);
  }

  activacion(id: number) {
    return this.http.get(`${this.url}activarDesactivarContenedores/${id}`);
  }

  restaurar(id: number) {
    return this.http.get(`${this.url}restoreContenedores/${id}`);
  }

  find(id: number) {
    return this.http.get(`${this.url}findContenedor/${id}`);
  }

}
