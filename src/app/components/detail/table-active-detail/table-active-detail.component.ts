import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetailService } from '../../../services/detail.service';

export interface UserData {
  id: number
  generator: string,
  energy: string,
  date: string
}

@Component({
  selector: 'app-table-active-detail',
  templateUrl: './table-active-detail.component.html',
  styleUrls: ['./table-active-detail.component.css']
})
export class TableActiveDetailComponent implements OnInit, AfterViewInit {

  detail: any;
  displayedColumns: string[] = ['generator', 'energy', 'date'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private detailService: DetailService) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.detailService.listDetailGeneradores().subscribe(
      res => {
        this.detail = res;
        
        let largo = this.detail.length;

        const detailGenerador = Array.from({ length: largo }, (_, k) => createDetail(
          this.detail[k].id,
          this.detail[k].generador_id.generador,
          this.detail[k].energia_producida,
          this.detail[k].fecha));
        this.dataSource = new MatTableDataSource(detailGenerador);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      }
    )
  }

  ngAfterViewInit(): void { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createDetail(id: number, generador: string, energia: number, fecha: string) {
  return {
    id: id,
    generator: generador,
    date: fecha,
    energy: `${energia} kWh`
  }
}