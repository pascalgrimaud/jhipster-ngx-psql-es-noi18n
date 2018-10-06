package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestPager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestPager entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestPagerRepository extends JpaRepository<TestPager, Long> {

    @Query("select test_pager from TestPager test_pager where test_pager.userOneToMany.login = ?#{principal.username}")
    List<TestPager> findByUserOneToManyIsCurrentUser();

    @Query(value = "select distinct test_pager from TestPager test_pager left join fetch test_pager.userManyToManies",
        countQuery = "select count(distinct test_pager) from TestPager test_pager")
    Page<TestPager> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_pager from TestPager test_pager left join fetch test_pager.userManyToManies")
    List<TestPager> findAllWithEagerRelationships();

    @Query("select test_pager from TestPager test_pager left join fetch test_pager.userManyToManies where test_pager.id =:id")
    Optional<TestPager> findOneWithEagerRelationships(@Param("id") Long id);

}
