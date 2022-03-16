package es.curso.rol.service.impl;

import java.util.ArrayList;
import java.util.List;
import es.curso.rol.service.IPocionService;
import org.springframework.stereotype.Service;
import es.curso.rol.model.Pocion;
import es.curso.rol.dto.PocionDTO;
import es.curso.rol.mapper.ModelMapperUtils;
import es.curso.rol.repository.PocionRepository;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;
import es.curso.rol.repository.specs.PocionSpecification;
import es.curso.rol.repository.specs.SearchOperation;
import es.curso.rol.repository.specs.SearchCriteria;

@Service
public class PocionService implements IPocionService {

    private PocionRepository pocionRepository;

    // constructor
    public PocionService(PocionRepository pocionRepository) {
        this.pocionRepository = pocionRepository;
    }

    @Override
    public List<PocionDTO> obtenerTodas() {

        List<Pocion> pociones = pocionRepository.findAll();
        return ModelMapperUtils.mapAll(pociones, PocionDTO.class);
    }

    @Override
    public Page<PocionDTO> obtenerTodasPaginado(Pageable pageable) {

        Page<Pocion> pociones = pocionRepository.findAll(pageable);
        Page<PocionDTO> dtoPage = pociones.map(pocion -> ModelMapperUtils.map(pocion, PocionDTO.class));
        return dtoPage;
    }

    @Override
    public Page<PocionDTO> obtenerTodasPaginadoSpec(Pageable pageable, SearchCriteria[] criteriaList) {

        PocionSpecification specPocion = new PocionSpecification();

        for (SearchCriteria criteria : criteriaList) {
            specPocion.add(criteria);
        }
        Page<Pocion> pociones = pocionRepository.findAll(specPocion, pageable);

        Page<PocionDTO> dtoPage = pociones.map(pocion -> ModelMapperUtils.map(pocion, PocionDTO.class));
        return dtoPage;
    }

    @Override
    public PocionDTO guardar(PocionDTO pocionDTO) {
        Pocion resultado = pocionRepository.save(ModelMapperUtils.map(pocionDTO,Pocion.class));
        return ModelMapperUtils.map(resultado, PocionDTO.class);
    }

    @Override
    public PocionDTO obtenerPocion(Long id) {
        Optional<Pocion> pocion;
        pocion = pocionRepository.findById(id);

        if (pocion.isPresent()) {
            return ModelMapperUtils.map(pocion.get(), PocionDTO.class);
        } else {
            return null;
        }
    }

    @Override
    public void borrar(Long id) {
        Pocion pocion = this.pocionRepository.findById(id).get();
        this.pocionRepository.delete(pocion);
    }




}





