package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EntityWithServiceClassPaginationAndDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EntityWithServiceClassPaginationAndDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceClassPaginationAndDTORepository extends JpaRepository<EntityWithServiceClassPaginationAndDTO, Long> {

}
