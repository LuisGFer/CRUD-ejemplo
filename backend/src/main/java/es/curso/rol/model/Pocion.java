package es.curso.rol.model;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "pocion")
public class Pocion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "es_epica")
    private Boolean esEpica;

    @Lob
    @Column
    private byte[] imagen;

    @Column
    private String imagenTipo;

}