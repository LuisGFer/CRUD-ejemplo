import { Component, OnInit } from '@angular/core';
import { Pocion } from '../../../../models/pocion.model';
import { PocionService } from '../../../../services/pocion.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pocion-list',
  templateUrl: './pocion-list.component.html',
  styleUrls: ['./pocion-list.component.css']
})
export class PocionListComponent implements OnInit {

  error: boolean = false;
  success: boolean = false;
  mensaje: string = '';

  pociones: Pocion[] = [];
  pocionAEliminar: number;

  constructor(private pocionService: PocionService,
              private router: Router,
              private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.obtenerPociones();
  }


  private obtenerPociones() {

    this.pocionService.obtenerPociones().subscribe((data: Pocion[]) => {
      this.pociones = data;
    });
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
