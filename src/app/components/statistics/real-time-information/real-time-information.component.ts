import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdministratorService } from 'src/app/services/administrator.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { InfoTiempoRealService } from 'src/app/services/info-tiempo-real.service';

@Component({
  selector: 'app-real-time-information',
  templateUrl: './real-time-information.component.html',
  styleUrls: ['./real-time-information.component.css']
})
export class RealTimeInformationComponent implements OnInit, OnDestroy {

  energia: number = 0;
  generadores: any;
  bandera: boolean = false;
  generador = new FormControl('', []);
  generadorSolicitado: any;

  constructor(private administradorService: AdministratorService, private generadorService: GeneratorService,
    private infoService: InfoTiempoRealService) { }

  ngOnInit(): void {
    this.generadorService.listar().subscribe(
      resp => {
        this.generadores = resp;
        if (this.generadores.length != 0) {
          this.generador.setValue(this.generadores[0].id);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.bandera) {
      this.infoService.decrementoGenerador(this.generadorSolicitado.serial).subscribe();
    }
  }

  cambiarEstado(event) {
    this.generadorSolicitado = this.generadores.find(n => n.id == this.generador.value);
    if (this.bandera) {
      this.bandera = false;
      this.infoService.decrementoGenerador(this.generadorSolicitado.serial).subscribe();
    } else {
      this.bandera = true;
      this.infoService.incrementoGenerador(this.generadorSolicitado.serial).subscribe(
        resp => {
          this.infoTiempoRealGenerador();
        }
      )
    }
  }

  infoTiempoRealGenerador() {
    this.administradorService.infoTiempoReal(this.generador.value).subscribe(
      respuesta => {
        let infoReal: any = respuesta;
        this.energia = infoReal.energia;
      }
    );
  }

  onChange(id) {
    const exist = this.generadores.find(n => n.id == id);
    if (this.bandera) {
      this.infoService.decrementoGenerador(this.generadorSolicitado.serial).subscribe();
      this.infoService.incrementoGenerador(exist.serial).subscribe(
        resp => {
          this.infoTiempoRealGenerador();
          this.generadorSolicitado = exist;
        }
      )
    }
  }

}
