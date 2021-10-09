import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  private url;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  getGeneracion(tipo: string) {
    return this.http.get(`${this.url}graficaGeneracionEnergia/${tipo}`);
  }

  getConsumo(tipo: string) {
    return this.http.get(`${this.url}graficaConsumoEnergia/${tipo}`);
  }
}
