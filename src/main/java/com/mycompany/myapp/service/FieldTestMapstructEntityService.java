package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.FieldTestMapstructEntity;
import com.mycompany.myapp.repository.FieldTestMapstructEntityRepository;
import com.mycompany.myapp.repository.search.FieldTestMapstructEntitySearchRepository;
import com.mycompany.myapp.service.dto.FieldTestMapstructEntityDTO;
import com.mycompany.myapp.service.mapper.FieldTestMapstructEntityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing FieldTestMapstructEntity.
 */
@Service
@Transactional
public class FieldTestMapstructEntityService {

    private final Logger log = LoggerFactory.getLogger(FieldTestMapstructEntityService.class);

    private final FieldTestMapstructEntityRepository fieldTestMapstructEntityRepository;

    private final FieldTestMapstructEntityMapper fieldTestMapstructEntityMapper;

    private final FieldTestMapstructEntitySearchRepository fieldTestMapstructEntitySearchRepository;

    public FieldTestMapstructEntityService(FieldTestMapstructEntityRepository fieldTestMapstructEntityRepository, FieldTestMapstructEntityMapper fieldTestMapstructEntityMapper, FieldTestMapstructEntitySearchRepository fieldTestMapstructEntitySearchRepository) {
        this.fieldTestMapstructEntityRepository = fieldTestMapstructEntityRepository;
        this.fieldTestMapstructEntityMapper = fieldTestMapstructEntityMapper;
        this.fieldTestMapstructEntitySearchRepository = fieldTestMapstructEntitySearchRepository;
    }

    /**
     * Save a fieldTestMapstructEntity.
     *
     * @param fieldTestMapstructEntityDTO the entity to save
     * @return the persisted entity
     */
    public FieldTestMapstructEntityDTO save(FieldTestMapstructEntityDTO fieldTestMapstructEntityDTO) {
        log.debug("Request to save FieldTestMapstructEntity : {}", fieldTestMapstructEntityDTO);

        FieldTestMapstructEntity fieldTestMapstructEntity = fieldTestMapstructEntityMapper.toEntity(fieldTestMapstructEntityDTO);
        fieldTestMapstructEntity = fieldTestMapstructEntityRepository.save(fieldTestMapstructEntity);
        FieldTestMapstructEntityDTO result = fieldTestMapstructEntityMapper.toDto(fieldTestMapstructEntity);
        fieldTestMapstructEntitySearchRepository.save(fieldTestMapstructEntity);
        return result;
    }

    /**
     * Get all the fieldTestMapstructEntities.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<FieldTestMapstructEntityDTO> findAll() {
        log.debug("Request to get all FieldTestMapstructEntities");
        return fieldTestMapstructEntityRepository.findAll().stream()
            .map(fieldTestMapstructEntityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one fieldTestMapstructEntity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<FieldTestMapstructEntityDTO> findOne(Long id) {
        log.debug("Request to get FieldTestMapstructEntity : {}", id);
        return fieldTestMapstructEntityRepository.findById(id)
            .map(fieldTestMapstructEntityMapper::toDto);
    }

    /**
     * Delete the fieldTestMapstructEntity by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FieldTestMapstructEntity : {}", id);
        fieldTestMapstructEntityRepository.deleteById(id);
        fieldTestMapstructEntitySearchRepository.deleteById(id);
    }

    /**
     * Search for the fieldTestMapstructEntity corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<FieldTestMapstructEntityDTO> search(String query) {
        log.debug("Request to search FieldTestMapstructEntities for query {}", query);
        return StreamSupport
            .stream(fieldTestMapstructEntitySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(fieldTestMapstructEntityMapper::toDto)
            .collect(Collectors.toList());
    }
}
