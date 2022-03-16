package es.curso.rol.dto;

import lombok.Data;

@Data
public class PocionDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Boolean esEpica;
}