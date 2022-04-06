import { Component, OnInit } from '@angular/core';
import { Pocion } from 'src/models/pocion.model';
import { PocionService } from 'src/services/pocion.service';
import { Router, ActivatedRoute} from '@angular/router';
import { throwError } from 'rxjs';
import { exitCode } from 'process';

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

  existeImagen(): boolean {
    let existe: boolean = false;
    if (this.pocion.imagenTipo && this.pocion.imagen) {
      existe = true;
    }
    return existe;
  }

  incluirImagenEnObjeto(event) {
    const inputFile = event.target as HTMLInputElement;
    const file: File = inputFile.files?.item(0) ?? null;

    this.leerFicheroComoString(file).then(
      (result) => {
        const tipoImagen: string = this.obtenerTipoImagen(result);
        console.log(tipoImagen);
        const base64Imagen: string = this.obtenerBase64Imagen(result);
        console.log(base64Imagen);
        
        this.pocion.imagenTipo = tipoImagen;
        this.pocion.imagen = base64Imagen;
      },
      (error) => {
        console.log("No se pudo cargar la imagen")
      }
    )
  }

  private leerFicheroComoString(file: File) {
    return new Promise<string>(function(resolve, reject) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function() {
          resolve(this.result as string)
          }
      })
  }

  private obtenerTipoImagen(base64Imagen: string): string {
    const partesBase64: string[] = base64Imagen.split(",");
    if (partesBase64.length !== 2) {
      throwError("No es un fichero correcto")
    }
    return partesBase64[0];
  }
  private obtenerBase64Imagen(base64Imagen: string): string {
    const partesBase64: string[] = base64Imagen.split(",");
    if (partesBase64.length !== 2) {
      throwError("No es un fichero correcto")
    }
    return partesBase64[1];
  }

}
