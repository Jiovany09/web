import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private url;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  listDetailGeneradores() {
    return this.http.get(`${this.url}listDetallesGeneradores`);
  }

  listDetailContenedores() {
    return this.http.get(`${this.url}listDetallesContenedores`);
  }
}
