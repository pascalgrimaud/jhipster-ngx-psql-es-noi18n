package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestCustomTableName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestCustomTableName entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestCustomTableNameRepository extends JpaRepository<TestCustomTableName, Long> {

    @Query("select test_custom_table_name_entity from TestCustomTableName test_custom_table_name_entity where test_custom_table_name_entity.userOneToMany.login = ?#{principal.username}")
    List<TestCustomTableName> findByUserOneToManyIsCurrentUser();

    @Query(value = "select distinct test_custom_table_name_entity from TestCustomTableName test_custom_table_name_entity left join fetch test_custom_table_name_entity.userManyToManies",
        countQuery = "select count(distinct test_custom_table_name_entity) from TestCustomTableName test_custom_table_name_entity")
    Page<TestCustomTableName> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_custom_table_name_entity from TestCustomTableName test_custom_table_name_entity left join fetch test_custom_table_name_entity.userManyToManies")
    List<TestCustomTableName> findAllWithEagerRelationships();

    @Query("select test_custom_table_name_entity from TestCustomTableName test_custom_table_name_entity left join fetch test_custom_table_name_entity.userManyToManies where test_custom_table_name_entity.id =:id")
    Optional<TestCustomTableName> findOneWithEagerRelationships(@Param("id") Long id);

}
