import { Component, OnInit } from '@angular/core';
import { Pocion } from 'src/models/pocion.model';
import { PocionService } from 'src/services/pocion.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pocion-form',
  templateUrl: './pocion-form.component.html',
  styleUrls: ['./pocion-form.component.css']
})
export class PocionFormComponent implements OnInit {

  error: boolean = false;
  success: boolean = false;
  mensaje: string = '';

  pocion: Pocion;
  pocionId: number;
  modoAlta: boolean;

  constructor(private pocionService: PocionService, 
              private router: Router,
              private route:ActivatedRoute ) { }

  ngOnInit(): void {

    // recuperamos posible parametro de entrada con id de pocion a editar
    if (this.route.snapshot.paramMap.get('pocionId')) { // modo edicion

      this.modoAlta = false;
      this.pocionId = +this.route.snapshot.paramMap.get('pocionId');
      this.cargarDatosPocion(this.pocionId);

    } else { // estamos en modo alta

      this.modoAlta = true;
      this.pocion = new Pocion();

    }

  }

  cargarDatosPocion(pocionId: number): void {

    this.pocionService.obtenerPocion(pocionId).subscribe(
      (data: Pocion) => {
        this.pocion = data;
      }, 
      (err) => {
        this.mensaje = "Se produjo un error al recuperar los datos de la poción. Error: " + err;
        this.error = true;
    });

  }

  guardar(): void {

    this.error=false;
    this.success=false;
    this.mensaje="";

    this.pocionService.insertarPocion(this.pocion).subscribe(
      (data: Pocion) => {
        if (this.modoAlta) {
          this.mensaje = "Se ha guardado la poción con éxito. Id: " + data.id;
          this.success = true;
          this.pocion = new Pocion();
        } else {
          this.router.navigate(['/pociones-list']);
        }
        
      }, 
      (err) => {
        this.mensaje = "Se produjo un error al guardar la poción. Error: " + err.error;
        this.error = true;
    });
  }

}
