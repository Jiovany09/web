import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetailService } from '../../../services/detail.service';

export interface UserData {
  id: number,
  content: string,
  energy: string,
  date: string
}

@Component({
  selector: 'app-table-eliminate-detail',
  templateUrl: './table-eliminate-detail.component.html',
  styleUrls: ['./table-eliminate-detail.component.css']
})
export class TableEliminateDetailComponent implements OnInit, AfterViewInit {

  detail: any;
  displayedColumns: string[] = ['content', 'energy', 'date'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private detailService: DetailService) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.detailService.listDetailContenedores().subscribe(
      res => {
        this.detail = res;
        let largo = this.detail.length;

        const detailContenedor = Array.from({ length: largo }, (_, k) => createDetail(
          this.detail[k].id,
          this.detail[k].contenedor_id.contenedor,
          this.detail[k].energia_consumida,
          this.detail[k].fecha));
        this.dataSource = new MatTableDataSource(detailContenedor);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
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

function createDetail(id: number, contenedor: string, energia: number, fecha: string) {
  return {
    id: id,
    content: contenedor,
    date: fecha,
    energy: `${energia} kWh`
  }
}
