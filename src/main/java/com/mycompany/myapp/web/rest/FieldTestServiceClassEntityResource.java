package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.FieldTestServiceClassEntity;
import com.mycompany.myapp.service.FieldTestServiceClassEntityService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.FieldTestServiceClassEntityCriteria;
import com.mycompany.myapp.service.FieldTestServiceClassEntityQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing FieldTestServiceClassEntity.
 */
@RestController
@RequestMapping("/api")
public class FieldTestServiceClassEntityResource {

    private final Logger log = LoggerFactory.getLogger(FieldTestServiceClassEntityResource.class);

    private static final String ENTITY_NAME = "fieldTestServiceClassEntity";

    private final FieldTestServiceClassEntityService fieldTestServiceClassEntityService;

    private final FieldTestServiceClassEntityQueryService fieldTestServiceClassEntityQueryService;

    public FieldTestServiceClassEntityResource(FieldTestServiceClassEntityService fieldTestServiceClassEntityService, FieldTestServiceClassEntityQueryService fieldTestServiceClassEntityQueryService) {
        this.fieldTestServiceClassEntityService = fieldTestServiceClassEntityService;
        this.fieldTestServiceClassEntityQueryService = fieldTestServiceClassEntityQueryService;
    }

    /**
     * POST  /field-test-service-class-entities : Create a new fieldTestServiceClassEntity.
     *
     * @param fieldTestServiceClassEntity the fieldTestServiceClassEntity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fieldTestServiceClassEntity, or with status 400 (Bad Request) if the fieldTestServiceClassEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/field-test-service-class-entities")
    @Timed
    public ResponseEntity<FieldTestServiceClassEntity> createFieldTestServiceClassEntity(@Valid @RequestBody FieldTestServiceClassEntity fieldTestServiceClassEntity) throws URISyntaxException {
        log.debug("REST request to save FieldTestServiceClassEntity : {}", fieldTestServiceClassEntity);
        if (fieldTestServiceClassEntity.getId() != null) {
            throw new BadRequestAlertException("A new fieldTestServiceClassEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldTestServiceClassEntity result = fieldTestServiceClassEntityService.save(fieldTestServiceClassEntity);
        return ResponseEntity.created(new URI("/api/field-test-service-class-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /field-test-service-class-entities : Updates an existing fieldTestServiceClassEntity.
     *
     * @param fieldTestServiceClassEntity the fieldTestServiceClassEntity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fieldTestServiceClassEntity,
     * or with status 400 (Bad Request) if the fieldTestServiceClassEntity is not valid,
     * or with status 500 (Internal Server Error) if the fieldTestServiceClassEntity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/field-test-service-class-entities")
    @Timed
    public ResponseEntity<FieldTestServiceClassEntity> updateFieldTestServiceClassEntity(@Valid @RequestBody FieldTestServiceClassEntity fieldTestServiceClassEntity) throws URISyntaxException {
        log.debug("REST request to update FieldTestServiceClassEntity : {}", fieldTestServiceClassEntity);
        if (fieldTestServiceClassEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FieldTestServiceClassEntity result = fieldTestServiceClassEntityService.save(fieldTestServiceClassEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fieldTestServiceClassEntity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /field-test-service-class-entities : get all the fieldTestServiceClassEntities.
     *
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of fieldTestServiceClassEntities in body
     */
    @GetMapping("/field-test-service-class-entities")
    @Timed
    public ResponseEntity<List<FieldTestServiceClassEntity>> getAllFieldTestServiceClassEntities(FieldTestServiceClassEntityCriteria criteria) {
        log.debug("REST request to get FieldTestServiceClassEntities by criteria: {}", criteria);
        List<FieldTestServiceClassEntity> entityList = fieldTestServiceClassEntityQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
    * GET  /field-test-service-class-entities/count : count all the fieldTestServiceClassEntities.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/field-test-service-class-entities/count")
    @Timed
    public ResponseEntity<Long> countFieldTestServiceClassEntities (FieldTestServiceClassEntityCriteria criteria) {
        log.debug("REST request to count FieldTestServiceClassEntities by criteria: {}", criteria);
        return ResponseEntity.ok().body(fieldTestServiceClassEntityQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /field-test-service-class-entities/:id : get the "id" fieldTestServiceClassEntity.
     *
     * @param id the id of the fieldTestServiceClassEntity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fieldTestServiceClassEntity, or with status 404 (Not Found)
     */
    @GetMapping("/field-test-service-class-entities/{id}")
    @Timed
    public ResponseEntity<FieldTestServiceClassEntity> getFieldTestServiceClassEntity(@PathVariable Long id) {
        log.debug("REST request to get FieldTestServiceClassEntity : {}", id);
        Optional<FieldTestServiceClassEntity> fieldTestServiceClassEntity = fieldTestServiceClassEntityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fieldTestServiceClassEntity);
    }

    /**
     * DELETE  /field-test-service-class-entities/:id : delete the "id" fieldTestServiceClassEntity.
     *
     * @param id the id of the fieldTestServiceClassEntity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/field-test-service-class-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteFieldTestServiceClassEntity(@PathVariable Long id) {
        log.debug("REST request to delete FieldTestServiceClassEntity : {}", id);
        fieldTestServiceClassEntityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/field-test-service-class-entities?query=:query : search for the fieldTestServiceClassEntity corresponding
     * to the query.
     *
     * @param query the query of the fieldTestServiceClassEntity search
     * @return the result of the search
     */
    @GetMapping("/_search/field-test-service-class-entities")
    @Timed
    public List<FieldTestServiceClassEntity> searchFieldTestServiceClassEntities(@RequestParam String query) {
        log.debug("REST request to search FieldTestServiceClassEntities for query {}", query);
        return fieldTestServiceClassEntityService.search(query);
    }

}
