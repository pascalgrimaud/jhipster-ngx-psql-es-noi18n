package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestMapstruct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestMapstruct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestMapstructRepository extends JpaRepository<TestMapstruct, Long> {

    @Query("select test_mapstruct from TestMapstruct test_mapstruct where test_mapstruct.userOneToMany.login = ?#{principal.username}")
    List<TestMapstruct> findByUserOneToManyIsCurrentUser();

    @Query(value = "select distinct test_mapstruct from TestMapstruct test_mapstruct left join fetch test_mapstruct.userManyToManies",
        countQuery = "select count(distinct test_mapstruct) from TestMapstruct test_mapstruct")
    Page<TestMapstruct> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_mapstruct from TestMapstruct test_mapstruct left join fetch test_mapstruct.userManyToManies")
    List<TestMapstruct> findAllWithEagerRelationships();

    @Query("select test_mapstruct from TestMapstruct test_mapstruct left join fetch test_mapstruct.userManyToManies where test_mapstruct.id =:id")
    Optional<TestMapstruct> findOneWithEagerRelationships(@Param("id") Long id);

}
