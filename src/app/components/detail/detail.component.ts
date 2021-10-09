import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  bandera: boolean = true;

  constructor() { }

  ngOnInit(): void {
    
  }

  visualizacion(variable:boolean){
    this.bandera = variable;
  }

}
