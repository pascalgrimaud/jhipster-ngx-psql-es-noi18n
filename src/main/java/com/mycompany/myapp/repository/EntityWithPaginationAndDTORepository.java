package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EntityWithPaginationAndDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EntityWithPaginationAndDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithPaginationAndDTORepository extends JpaRepository<EntityWithPaginationAndDTO, Long> {

}
