import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class InfoTiempoRealService {

  private url;

  constructor(private http: HttpClient) { 
    this.url = global.url;
  }

  incrementoGenerador(serial: string) {
    return this.http.get(`${this.url}aumentarUsuarioGenerador/${serial}`);
  }

  decrementoGenerador(serial: string) {
    return this.http.get(`${this.url}decrementarUsuarioGenerador/${serial}`);
  }
}
