package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EntityWithServiceImplAndPagination;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EntityWithServiceImplAndPagination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceImplAndPaginationRepository extends JpaRepository<EntityWithServiceImplAndPagination, Long> {

}
