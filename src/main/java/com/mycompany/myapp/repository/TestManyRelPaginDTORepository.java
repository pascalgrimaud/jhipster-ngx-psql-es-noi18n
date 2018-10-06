package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestManyRelPaginDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TestManyRelPaginDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestManyRelPaginDTORepository extends JpaRepository<TestManyRelPaginDTO, Long> {

    @Query(value = "select distinct test_many_many_pagination_dto from TestManyRelPaginDTO test_many_many_pagination_dto left join fetch test_many_many_pagination_dto.testMapstructs",
        countQuery = "select count(distinct test_many_many_pagination_dto) from TestManyRelPaginDTO test_many_many_pagination_dto")
    Page<TestManyRelPaginDTO> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct test_many_many_pagination_dto from TestManyRelPaginDTO test_many_many_pagination_dto left join fetch test_many_many_pagination_dto.testMapstructs")
    List<TestManyRelPaginDTO> findAllWithEagerRelationships();

    @Query("select test_many_many_pagination_dto from TestManyRelPaginDTO test_many_many_pagination_dto left join fetch test_many_many_pagination_dto.testMapstructs where test_many_many_pagination_dto.id =:id")
    Optional<TestManyRelPaginDTO> findOneWithEagerRelationships(@Param("id") Long id);

}
