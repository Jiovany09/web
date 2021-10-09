import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-navbar',
  templateUrl: './menu-navbar.component.html',
  styleUrls: ['./menu-navbar.component.css']
})
export class MenuNavbarComponent implements OnInit {

  info: any;
  nombre: any;

  constructor(private rout: Router) { }

  ngOnInit(): void {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    this.info = JSON.parse(sessionStorage.getItem('energy-of-water/simple-data-user'));
    if (this.info.materno == null) {
      this.nombre = `${this.info.nombre} ${this.info.paterno}`;
    } else {
      this.nombre = `${this.info.nombre} ${this.info.paterno} ${this.info.materno}`;
    }
  }

  logout() {
    this.rout.navigateByUrl('/login').then(
      res => {
        sessionStorage.removeItem('energy-of-water/information-page');
        sessionStorage.removeItem('energy-of-water/simple-data-user');
      }, error => {
        console.log(error);
      }
    );

  }

}
