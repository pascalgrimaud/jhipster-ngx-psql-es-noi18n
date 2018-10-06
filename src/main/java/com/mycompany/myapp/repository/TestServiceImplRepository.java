package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestServiceImpl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestServiceImplRepository extends JpaRepository<TestServiceImpl, Long>, JpaSpecificationExecutor<TestServiceImpl> {

    @Query("select test_service_impl from TestServiceImpl test_service_impl where test_service_impl.userOneToMany.login = ?#{principal.username}")
    List<TestServiceImpl> findByUserOneToManyIsCurrentUser();

    @Query(value = "select distinct test_service_impl from TestServiceImpl test_service_impl left join fetch test_service_impl.userManyToManies",
        countQuery = "select count(distinct test_service_impl) from TestServiceImpl test_service_impl")
    Page<TestServiceImpl> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_service_impl from TestServiceImpl test_service_impl left join fetch test_service_impl.userManyToManies")
    List<TestServiceImpl> findAllWithEagerRelationships();

    @Query("select test_service_impl from TestServiceImpl test_service_impl left join fetch test_service_impl.userManyToManies where test_service_impl.id =:id")
    Optional<TestServiceImpl> findOneWithEagerRelationships(@Param("id") Long id);

}
