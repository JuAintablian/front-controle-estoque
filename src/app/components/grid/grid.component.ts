import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  CustomDataSource,
  Filter,
  Pagination,
  ProdutoFilterProps,
  ProdutoListItem,
} from './produto.model';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'ngd-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  filtro: FormGroup;
  dataSource: CustomDataSource<ProdutoListItem, ProdutoFilterProps>;
  displayedColumns: string[] = ['id', 'nome', 'categoria', 'quantidade'];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.dataSource = new CustomDataSource<ProdutoListItem, ProdutoFilterProps>(
      (filtro: Filter<ProdutoFilterProps>) => this.produtoService.buscarLista()
    );

    this.filtro = new FormGroup({
      id: new FormControl('', [Validators.pattern(/\d{1,}/g)]),
      nome: new FormControl(''),
    });
  }

  ngAfterViewInit(): void {
    this.buscar();
  }

  buscar() {
    this.dataSource
      .loadData({
        pageNumber: 1,
        pageSize: this.paginator.pageSize,
        sortOrder: 'asc',
        ...this.filtro.value,
      })
      .subscribe((pagination: Pagination) => {
        this.paginator.length = pagination.totalCount;
        this.paginator.firstPage();
      });
  }
}
