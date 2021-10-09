import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersModule } from '../modules/users/users.module';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  login(administradores: UsersModule) {
    return this.http.post(`${this.url}login`, administradores);
  }
}
