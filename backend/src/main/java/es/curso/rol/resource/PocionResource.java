package es.curso.rol.resource;

import org.springframework.web.bind.annotation.*;
import es.curso.rol.dto.PocionDTO;
import es.curso.rol.service.IPocionService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import es.curso.rol.repository.specs.SearchCriteria;

@RestController
@RequestMapping("/api")
public class PocionResource {

    private IPocionService pocionService;

    public PocionResource(IPocionService pocionService) {
        this.pocionService = pocionService;
    }

    @CrossOrigin
    @GetMapping("/pociones")
    public List<PocionDTO> getAllPociones() {
        return pocionService.obtenerTodas();
    }


    @CrossOrigin
    @GetMapping("/pociones-pag")
    public Page<PocionDTO> getAllPociones(Pageable pageable) {
        return pocionService.obtenerTodasPaginado(pageable);
    }

    @CrossOrigin
    @PostMapping("/pociones-pag-spec")
    public Page<PocionDTO> getAllPocionesSpec(Pageable pageable, @RequestBody SearchCriteria[] criteria) {
        return pocionService.obtenerTodasPaginadoSpec(pageable, criteria);
    }

    @CrossOrigin
    @PostMapping("/pociones")
    public ResponseEntity crearPocion(@RequestBody PocionDTO pocion){

        if (pocion.getTitulo() == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("El titulo no puede estar vacío");
        }


        PocionDTO pocionInsertada = this.pocionService.guardar(pocion);
        return new ResponseEntity<PocionDTO>(pocionInsertada ,new HttpHeaders(),HttpStatus.CREATED);
    }

    @CrossOrigin
    @PutMapping("/pociones")
    public PocionDTO modificarPocion(@RequestBody PocionDTO pocion){
        return this.pocionService.guardar(pocion);
    }

    @CrossOrigin
    @GetMapping("/pociones/{id}")
    public PocionDTO getPocion(@PathVariable Long id) {
        return this.pocionService.obtenerPocion(id);
    }

    @CrossOrigin
    @DeleteMapping("/pociones/{id}")
    public void borrarPocion(@PathVariable Long id) {
        this.pocionService.borrar(id);
    }



}