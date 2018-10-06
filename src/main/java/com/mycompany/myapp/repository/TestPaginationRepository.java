package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestPagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestPagination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestPaginationRepository extends JpaRepository<TestPagination, Long> {

    @Query("select test_pagination from TestPagination test_pagination where test_pagination.userOneToMany.login = ?#{principal.username}")
    List<TestPagination> findByUserOneToManyIsCurrentUser();

    @Query(value = "select distinct test_pagination from TestPagination test_pagination left join fetch test_pagination.userManyToManies",
        countQuery = "select count(distinct test_pagination) from TestPagination test_pagination")
    Page<TestPagination> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_pagination from TestPagination test_pagination left join fetch test_pagination.userManyToManies")
    List<TestPagination> findAllWithEagerRelationships();

    @Query("select test_pagination from TestPagination test_pagination left join fetch test_pagination.userManyToManies where test_pagination.id =:id")
    Optional<TestPagination> findOneWithEagerRelationships(@Param("id") Long id);

}
