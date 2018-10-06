package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestManyToMany;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestManyToMany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestManyToManyRepository extends JpaRepository<TestManyToMany, Long> {

    @Query(value = "select distinct test_many_to_many from TestManyToMany test_many_to_many left join fetch test_many_to_many.testEntities left join fetch test_many_to_many.testMapstructs left join fetch test_many_to_many.testServiceClasses left join fetch test_many_to_many.testServiceImpls left join fetch test_many_to_many.testInfiniteScrolls left join fetch test_many_to_many.testPagers left join fetch test_many_to_many.testPaginations left join fetch test_many_to_many.testCustomTableNames",
        countQuery = "select count(distinct test_many_to_many) from TestManyToMany test_many_to_many")
    Page<TestManyToMany> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_many_to_many from TestManyToMany test_many_to_many left join fetch test_many_to_many.testEntities left join fetch test_many_to_many.testMapstructs left join fetch test_many_to_many.testServiceClasses left join fetch test_many_to_many.testServiceImpls left join fetch test_many_to_many.testInfiniteScrolls left join fetch test_many_to_many.testPagers left join fetch test_many_to_many.testPaginations left join fetch test_many_to_many.testCustomTableNames")
    List<TestManyToMany> findAllWithEagerRelationships();

    @Query("select test_many_to_many from TestManyToMany test_many_to_many left join fetch test_many_to_many.testEntities left join fetch test_many_to_many.testMapstructs left join fetch test_many_to_many.testServiceClasses left join fetch test_many_to_many.testServiceImpls left join fetch test_many_to_many.testInfiniteScrolls left join fetch test_many_to_many.testPagers left join fetch test_many_to_many.testPaginations left join fetch test_many_to_many.testCustomTableNames where test_many_to_many.id =:id")
    Optional<TestManyToMany> findOneWithEagerRelationships(@Param("id") Long id);

}
