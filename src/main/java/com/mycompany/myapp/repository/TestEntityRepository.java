package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestEntityRepository extends JpaRepository<TestEntity, Long> {

    @Query("select test_entity from TestEntity test_entity where test_entity.userOneToMany.login = ?#{principal.username}")
    List<TestEntity> findByUserOneToManyIsCurrentUser();

    @Query(value = "select distinct test_entity from TestEntity test_entity left join fetch test_entity.userManyToManies",
        countQuery = "select count(distinct test_entity) from TestEntity test_entity")
    Page<TestEntity> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_entity from TestEntity test_entity left join fetch test_entity.userManyToManies")
    List<TestEntity> findAllWithEagerRelationships();

    @Query("select test_entity from TestEntity test_entity left join fetch test_entity.userManyToManies where test_entity.id =:id")
    Optional<TestEntity> findOneWithEagerRelationships(@Param("id") Long id);

}
