import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pocion } from '../models/pocion.model';
import { Observable } from 'rxjs';
import { Filtro } from 'src/models/filtro.model';



@Injectable({

  providedIn: 'root'

})

export class PocionService {



  constructor(private http: HttpClient) {}



   public obtenerPociones(): Observable<Pocion[]> {

     const urlEndPoint = 'http://localhost:8080/api/pociones';

     return this.http.get<Pocion[]>(urlEndPoint);

   }

   public obtenerPocionesPaginado(page: number, size: number, sort: string, filtros: Filtro[]): Observable<Pocion[]> {

    const paramPageable = "?page=" + page + "&size=" + size + "&sort=" + sort;
    const urlEndPoint = 'http://localhost:8080/api/pociones-pag-spec' + paramPageable;

    return this.http.post<Pocion[]>(urlEndPoint, filtros);

  }

   public obtenerPocion(id: number): Observable<Pocion> {

    const urlEndPoint = 'http://localhost:8080/api/pociones/' + id;

    return this.http.get<Pocion>(urlEndPoint);

  }

  public insertarPocion(pocion: Pocion): Observable<any> {

    const urlEndPoint = 'http://localhost:8080/api/pociones';

    return this.http.post(urlEndPoint, pocion);

  }

  public modificarPocion(pocion: Pocion): Observable<any> {

    const urlEndPoint = 'http://localhost:8080/api/pociones';

    return this.http.put(urlEndPoint, pocion);

  }

  public eliminarPocion(id: number): Observable<any> {

    const urlEndPoint = 'http://localhost:8080/api/pociones/' + id;

    return this.http.delete(urlEndPoint);

  }

}

