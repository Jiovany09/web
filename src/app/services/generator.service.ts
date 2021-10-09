import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private url;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  listar() {
    return this.http.get(`${this.url}listGeneradores`);
  }

  listarEliminados() {
    return this.http.get(`${this.url}listGeneradoresEliminate`);
  }

  guardar(serial: string) {
    return this.http.post(`${this.url}createGeneradores`, serial);
  }

  actualizar(generador: any) {
    return this.http.put(`${this.url}editGeneradores/${generador.id}`, generador);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}eliminateGeneradores/${id}`);
  }

  activacion(id: number) {
    return this.http.get(`${this.url}activarDesactivarGeneradores/${id}`);
  }

  restaurar(id: number) {
    return this.http.get(`${this.url}restoreGeneradores/${id}`);
  }

  find(id: number) {
    return this.http.get(`${this.url}findGenerador/${id}`);
  }

}
