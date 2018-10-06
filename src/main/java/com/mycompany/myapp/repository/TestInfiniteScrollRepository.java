package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestInfiniteScroll;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestInfiniteScroll entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestInfiniteScrollRepository extends JpaRepository<TestInfiniteScroll, Long> {

    @Query("select test_infinite_scroll from TestInfiniteScroll test_infinite_scroll where test_infinite_scroll.userOneToMany.login = ?#{principal.username}")
    List<TestInfiniteScroll> findByUserOneToManyIsCurrentUser();

    @Query(value = "select distinct test_infinite_scroll from TestInfiniteScroll test_infinite_scroll left join fetch test_infinite_scroll.userManyToManies",
        countQuery = "select count(distinct test_infinite_scroll) from TestInfiniteScroll test_infinite_scroll")
    Page<TestInfiniteScroll> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_infinite_scroll from TestInfiniteScroll test_infinite_scroll left join fetch test_infinite_scroll.userManyToManies")
    List<TestInfiniteScroll> findAllWithEagerRelationships();

    @Query("select test_infinite_scroll from TestInfiniteScroll test_infinite_scroll left join fetch test_infinite_scroll.userManyToManies where test_infinite_scroll.id =:id")
    Optional<TestInfiniteScroll> findOneWithEagerRelationships(@Param("id") Long id);

}
