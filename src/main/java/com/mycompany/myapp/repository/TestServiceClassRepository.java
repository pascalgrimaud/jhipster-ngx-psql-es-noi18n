package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestServiceClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestServiceClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestServiceClassRepository extends JpaRepository<TestServiceClass, Long>, JpaSpecificationExecutor<TestServiceClass> {

    @Query("select test_service_class from TestServiceClass test_service_class where test_service_class.userOneToMany.login = ?#{principal.username}")
    List<TestServiceClass> findByUserOneToManyIsCurrentUser();

    @Query(value = "select distinct test_service_class from TestServiceClass test_service_class left join fetch test_service_class.userManyToManies",
        countQuery = "select count(distinct test_service_class) from TestServiceClass test_service_class")
    Page<TestServiceClass> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_service_class from TestServiceClass test_service_class left join fetch test_service_class.userManyToManies")
    List<TestServiceClass> findAllWithEagerRelationships();

    @Query("select test_service_class from TestServiceClass test_service_class left join fetch test_service_class.userManyToManies where test_service_class.id =:id")
    Optional<TestServiceClass> findOneWithEagerRelationships(@Param("id") Long id);

}
