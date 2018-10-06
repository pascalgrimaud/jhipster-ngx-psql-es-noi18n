package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TestServiceImplService;
import com.mycompany.myapp.domain.TestServiceImpl;
import com.mycompany.myapp.repository.TestServiceImplRepository;
import com.mycompany.myapp.repository.search.TestServiceImplSearchRepository;
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
 * Service Implementation for managing TestServiceImpl.
 */
@Service
@Transactional
public class TestServiceImplServiceImpl implements TestServiceImplService {

    private final Logger log = LoggerFactory.getLogger(TestServiceImplServiceImpl.class);

    private final TestServiceImplRepository testServiceImplRepository;

    private final TestServiceImplSearchRepository testServiceImplSearchRepository;

    public TestServiceImplServiceImpl(TestServiceImplRepository testServiceImplRepository, TestServiceImplSearchRepository testServiceImplSearchRepository) {
        this.testServiceImplRepository = testServiceImplRepository;
        this.testServiceImplSearchRepository = testServiceImplSearchRepository;
    }

    /**
     * Save a testServiceImpl.
     *
     * @param testServiceImpl the entity to save
     * @return the persisted entity
     */
    @Override
    public TestServiceImpl save(TestServiceImpl testServiceImpl) {
        log.debug("Request to save TestServiceImpl : {}", testServiceImpl);
        TestServiceImpl result = testServiceImplRepository.save(testServiceImpl);
        testServiceImplSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the testServiceImpls.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TestServiceImpl> findAll() {
        log.debug("Request to get all TestServiceImpls");
        return testServiceImplRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the TestServiceImpl with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<TestServiceImpl> findAllWithEagerRelationships(Pageable pageable) {
        return testServiceImplRepository.findAllWithEagerRelationships(pageable);
    }
    


    /**
     *  get all the testServiceImpls where TestOneToOne is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<TestServiceImpl> findAllWhereTestOneToOneIsNull() {
        log.debug("Request to get all testServiceImpls where TestOneToOne is null");
        return StreamSupport
            .stream(testServiceImplRepository.findAll().spliterator(), false)
            .filter(testServiceImpl -> testServiceImpl.getTestOneToOne() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one testServiceImpl by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TestServiceImpl> findOne(Long id) {
        log.debug("Request to get TestServiceImpl : {}", id);
        return testServiceImplRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the testServiceImpl by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TestServiceImpl : {}", id);
        testServiceImplRepository.deleteById(id);
        testServiceImplSearchRepository.deleteById(id);
    }

    /**
     * Search for the testServiceImpl corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TestServiceImpl> search(String query) {
        log.debug("Request to search TestServiceImpls for query {}", query);
        return StreamSupport
            .stream(testServiceImplSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
