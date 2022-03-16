package es.curso.rol.service;

import org.springframework.stereotype.Service;
import es.curso.rol.dto.PocionDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import es.curso.rol.repository.specs.SearchCriteria;

@Service
public interface IPocionService {
    public List<PocionDTO> obtenerTodas();
    public Page<PocionDTO> obtenerTodasPaginado(Pageable pageable);
    public Page<PocionDTO> obtenerTodasPaginadoSpec(Pageable pageable, SearchCriteria[] criteria);
    public PocionDTO guardar(PocionDTO pocion);
    public PocionDTO obtenerPocion(Long id);
    public void borrar(Long id);
}
