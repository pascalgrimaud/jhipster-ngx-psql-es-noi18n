package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EntityWithServiceImpl;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EntityWithServiceImpl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceImplRepository extends JpaRepository<EntityWithServiceImpl, Long> {

}
