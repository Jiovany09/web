import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { GraphicsService } from '../../../services/graphics.service';
import { StatisticsComponent } from '../statistics.component';

@Component({
  selector: 'app-bar-vertical',
  templateUrl: './bar-vertical.component.html',
  styleUrls: ['./bar-vertical.component.css']
})
export class BarVerticalComponent implements OnInit {

  public color: any[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'];

  public border: any[] = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'];

  constructor(private graphicsService: GraphicsService) { }

  ngOnInit(): void {
    this.graphicsService.getGeneracion('dia').subscribe(
      res => {
        this.llenadoFechas(res);
        this.llenadoGraficas(res);
      }, error => {
        console.log(error);
      }
    )
  }

  llenadoFechas(data: any) {
    let arreglo: any[] = [];
    for (let index = 0; index < data.arregloFechas.length; index++) {
      arreglo[index] = data.arregloFechas[index].fechaGrafica;
    }
    this.barChartLabels = arreglo;
  }

  llenadoGraficas(data: any) {
    let constante = 0;
    for (let index = 0; index < data.infoGeneral.length; index++) {
      if (data.infoGeneral[index].data.length != 0) {
        let arreglo: any[] = [];
        for (let k = 0; k < data.arregloFechas.length; k++) {
          for (let j = 0; j < data.infoGeneral[index].data.length; j++) {
            if (data.arregloFechas[k].fecha == data.infoGeneral[index].data[j].fecha) {
              arreglo[k] = data.infoGeneral[index].data[j].energia;
            }
          }
        }
        this.barChartData[constante] =
        {
          data: arreglo,
          backgroundColor: this.color[constante],
          borderColor: this.border[constante],
          label: data.infoGeneral[index].generador,
          borderWidth: 1
        };
        constante++;
      }
    }
  }

  public barChartOptions: any = {
    scaleShowVerticallines: true,
    responsive: true
  };

  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [];

  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

}
