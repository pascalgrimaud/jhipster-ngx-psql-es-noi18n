package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TestManyRelPaginDTOService;
import com.mycompany.myapp.domain.TestManyRelPaginDTO;
import com.mycompany.myapp.repository.TestManyRelPaginDTORepository;
import com.mycompany.myapp.repository.search.TestManyRelPaginDTOSearchRepository;
import com.mycompany.myapp.service.dto.TestManyRelPaginDTODTO;
import com.mycompany.myapp.service.mapper.TestManyRelPaginDTOMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TestManyRelPaginDTO.
 */
@Service
@Transactional
public class TestManyRelPaginDTOServiceImpl implements TestManyRelPaginDTOService {

    private final Logger log = LoggerFactory.getLogger(TestManyRelPaginDTOServiceImpl.class);

    private final TestManyRelPaginDTORepository testManyRelPaginDTORepository;

    private final TestManyRelPaginDTOMapper testManyRelPaginDTOMapper;

    private final TestManyRelPaginDTOSearchRepository testManyRelPaginDTOSearchRepository;

    public TestManyRelPaginDTOServiceImpl(TestManyRelPaginDTORepository testManyRelPaginDTORepository, TestManyRelPaginDTOMapper testManyRelPaginDTOMapper, TestManyRelPaginDTOSearchRepository testManyRelPaginDTOSearchRepository) {
        this.testManyRelPaginDTORepository = testManyRelPaginDTORepository;
        this.testManyRelPaginDTOMapper = testManyRelPaginDTOMapper;
        this.testManyRelPaginDTOSearchRepository = testManyRelPaginDTOSearchRepository;
    }

    /**
     * Save a testManyRelPaginDTO.
     *
     * @param testManyRelPaginDTODTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TestManyRelPaginDTODTO save(TestManyRelPaginDTODTO testManyRelPaginDTODTO) {
        log.debug("Request to save TestManyRelPaginDTO : {}", testManyRelPaginDTODTO);

        TestManyRelPaginDTO testManyRelPaginDTO = testManyRelPaginDTOMapper.toEntity(testManyRelPaginDTODTO);
        testManyRelPaginDTO = testManyRelPaginDTORepository.save(testManyRelPaginDTO);
        TestManyRelPaginDTODTO result = testManyRelPaginDTOMapper.toDto(testManyRelPaginDTO);
        testManyRelPaginDTOSearchRepository.save(testManyRelPaginDTO);
        return result;
    }

    /**
     * Get all the testManyRelPaginDTOS.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TestManyRelPaginDTODTO> findAll(Pageable pageable) {
        log.debug("Request to get all TestManyRelPaginDTOS");
        return testManyRelPaginDTORepository.findAll(pageable)
            .map(testManyRelPaginDTOMapper::toDto);
    }

    /**
     * Get all the TestManyRelPaginDTO with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<TestManyRelPaginDTODTO> findAllWithEagerRelationships(Pageable pageable) {
        return testManyRelPaginDTORepository.findAllWithEagerRelationships(pageable).map(testManyRelPaginDTOMapper::toDto);
    }
    

    /**
     * Get one testManyRelPaginDTO by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TestManyRelPaginDTODTO> findOne(Long id) {
        log.debug("Request to get TestManyRelPaginDTO : {}", id);
        return testManyRelPaginDTORepository.findOneWithEagerRelationships(id)
            .map(testManyRelPaginDTOMapper::toDto);
    }

    /**
     * Delete the testManyRelPaginDTO by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TestManyRelPaginDTO : {}", id);
        testManyRelPaginDTORepository.deleteById(id);
        testManyRelPaginDTOSearchRepository.deleteById(id);
    }

    /**
     * Search for the testManyRelPaginDTO corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TestManyRelPaginDTODTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TestManyRelPaginDTOS for query {}", query);
        return testManyRelPaginDTOSearchRepository.search(queryStringQuery(query), pageable)
            .map(testManyRelPaginDTOMapper::toDto);
    }
}
