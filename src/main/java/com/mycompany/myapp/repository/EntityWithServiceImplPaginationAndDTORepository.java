package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EntityWithServiceImplPaginationAndDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EntityWithServiceImplPaginationAndDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceImplPaginationAndDTORepository extends JpaRepository<EntityWithServiceImplPaginationAndDTO, Long> {

}
