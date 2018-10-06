package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FieldTestPaginationEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FieldTestPaginationEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestPaginationEntityRepository extends JpaRepository<FieldTestPaginationEntity, Long> {

}
