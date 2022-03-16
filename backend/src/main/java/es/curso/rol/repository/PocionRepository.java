package es.curso.rol.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import es.curso.rol.model.Pocion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import es.curso.rol.repository.specs.PocionSpecification;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

@SuppressWarnings("unused")
@Repository
public interface PocionRepository extends   JpaRepository<Pocion, Long>,
                                            JpaSpecificationExecutor<Pocion> {

    Page<Pocion> findAll(Pageable pageable);
    Page<Pocion> findAll(Specification<Pocion> specPocion, Pageable pageable);
}
