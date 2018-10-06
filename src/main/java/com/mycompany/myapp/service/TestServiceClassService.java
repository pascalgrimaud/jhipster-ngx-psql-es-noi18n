package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TestServiceClass;
import com.mycompany.myapp.repository.TestServiceClassRepository;
import com.mycompany.myapp.repository.search.TestServiceClassSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TestServiceClass.
 */
@Service
@Transactional
public class TestServiceClassService {

    private final Logger log = LoggerFactory.getLogger(TestServiceClassService.class);

    private final TestServiceClassRepository testServiceClassRepository;

    private final TestServiceClassSearchRepository testServiceClassSearchRepository;

    public TestServiceClassService(TestServiceClassRepository testServiceClassRepository, TestServiceClassSearchRepository testServiceClassSearchRepository) {
        this.testServiceClassRepository = testServiceClassRepository;
        this.testServiceClassSearchRepository = testServiceClassSearchRepository;
    }

    /**
     * Save a testServiceClass.
     *
     * @param testServiceClass the entity to save
     * @return the persisted entity
     */
    public TestServiceClass save(TestServiceClass testServiceClass) {
        log.debug("Request to save TestServiceClass : {}", testServiceClass);
        TestServiceClass result = testServiceClassRepository.save(testServiceClass);
        testServiceClassSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the testServiceClasses.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TestServiceClass> findAll() {
        log.debug("Request to get all TestServiceClasses");
        return testServiceClassRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the TestServiceClass with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<TestServiceClass> findAllWithEagerRelationships(Pageable pageable) {
        return testServiceClassRepository.findAllWithEagerRelationships(pageable);
    }
    


    /**
     *  get all the testServiceClasses where TestOneToOne is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<TestServiceClass> findAllWhereTestOneToOneIsNull() {
        log.debug("Request to get all testServiceClasses where TestOneToOne is null");
        return StreamSupport
            .stream(testServiceClassRepository.findAll().spliterator(), false)
            .filter(testServiceClass -> testServiceClass.getTestOneToOne() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one testServiceClass by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TestServiceClass> findOne(Long id) {
        log.debug("Request to get TestServiceClass : {}", id);
        return testServiceClassRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the testServiceClass by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TestServiceClass : {}", id);
        testServiceClassRepository.deleteById(id);
        testServiceClassSearchRepository.deleteById(id);
    }

    /**
     * Search for the testServiceClass corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TestServiceClass> search(String query) {
        log.debug("Request to search TestServiceClasses for query {}", query);
        return StreamSupport
            .stream(testServiceClassSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
