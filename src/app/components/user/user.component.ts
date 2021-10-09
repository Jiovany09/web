import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  bandera: boolean = true;

  constructor() { }

  ngOnInit(): void {
    
  }

  visualizacion(variable:boolean){
    this.bandera = variable;
  }

}
