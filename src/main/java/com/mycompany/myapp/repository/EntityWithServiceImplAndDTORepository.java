package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EntityWithServiceImplAndDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EntityWithServiceImplAndDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceImplAndDTORepository extends JpaRepository<EntityWithServiceImplAndDTO, Long> {

}
