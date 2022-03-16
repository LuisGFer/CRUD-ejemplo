import { Component, OnInit } from '@angular/core';
import { Pocion } from '../../../../models/pocion.model';
import { PocionService } from '../../../../services/pocion.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Filtro } from 'src/models/filtro.model';

@Component({
  selector: 'app-pocion-list-paged',
  templateUrl: './pocion-list-paged.component.html',
  styleUrls: ['./pocion-list-paged.component.css']
})
export class PocionListPagedComponent implements OnInit {

  error: boolean = false;
  success: boolean = false;
  mensaje: string = '';


  page: number = 0;
  size: number = 5;
  sort: string = "titulo,asc";

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;

  filtros: Filtro[] = [];
  filtroTitulo: string = "";
  filtroEsEpica: boolean = false;


  pociones: Pocion[] = [];
  pocionAEliminar: number;

  constructor(private pocionService: PocionService,
              private router: Router,
              private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.obtenerPociones(this.page, this.size, this.sort);
  }


  private obtenerPociones(page: number, size: number, sort: string) {

    this.pocionService.obtenerPocionesPaginado(page, size, sort, this.filtros).subscribe((data: any) => {
      this.pociones = data.content;
      this.first = data.first;
      this.last = data.last;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    });
  }

  navegarAnterior() {
    this.page = this.page - 1;
    this.obtenerPociones(this.page, this.size, this.sort);
  }

  navegarSiguiente() {
    this.page = this.page + 1;
    this.obtenerPociones(this.page, this.size, this.sort);
  }

  buscar() {
    this.montarFiltros();
    this.obtenerPociones(this.page, this.size, this.sort);
  }

  montarFiltros() {

    this.filtros = [];

    if (this.filtroTitulo !== "") {
      let filTitulo: Filtro = new Filtro();
      filTitulo.key = "titulo";
      filTitulo.value = this.filtroTitulo;
      filTitulo.operation = "MATCH";
      this.filtros.push(filTitulo);

    }

    if (this.filtroEsEpica) {
      let filEpica: Filtro = new Filtro();
      filEpica.key = "esEpica";
      filEpica.value = true;
      filEpica.operation = "EQUAL";
      this.filtros.push(filEpica);
    }
  }

  prepararEliminar(pocionId: number) {
    this.pocionAEliminar = pocionId;
  }

  eliminar(pocionId: number) {
    this.pocionService.eliminarPocion(pocionId).subscribe(
      (data: Pocion) => {
        this.pocionService.obtenerPociones().subscribe((data: Pocion[]) => {
          this.pociones = data;
        });
      }, 
      (err) => {
        this.mensaje = "Se produjo un error al borrar la poción. Error: " + err;
        this.error = true;
    });

  }

}

