package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TestServiceImpl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TestServiceImpl.
 */
public interface TestServiceImplService {

    /**
     * Save a testServiceImpl.
     *
     * @param testServiceImpl the entity to save
     * @return the persisted entity
     */
    TestServiceImpl save(TestServiceImpl testServiceImpl);

    /**
     * Get all the testServiceImpls.
     *
     * @return the list of entities
     */
    List<TestServiceImpl> findAll();
    /**
     * Get all the TestServiceImplDTO where TestOneToOne is null.
     *
     * @return the list of entities
     */
    List<TestServiceImpl> findAllWhereTestOneToOneIsNull();

    /**
     * Get all the TestServiceImpl with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<TestServiceImpl> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" testServiceImpl.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TestServiceImpl> findOne(Long id);

    /**
     * Delete the "id" testServiceImpl.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the testServiceImpl corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TestServiceImpl> search(String query);
}
