package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TestTwoRelationshipsSameEntity;
import com.mycompany.myapp.repository.TestTwoRelationshipsSameEntityRepository;
import com.mycompany.myapp.repository.search.TestTwoRelationshipsSameEntitySearchRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TestTwoRelationshipsSameEntity.
 */
@RestController
@RequestMapping("/api")
public class TestTwoRelationshipsSameEntityResource {

    private final Logger log = LoggerFactory.getLogger(TestTwoRelationshipsSameEntityResource.class);

    private static final String ENTITY_NAME = "testTwoRelationshipsSameEntity";

    private final TestTwoRelationshipsSameEntityRepository testTwoRelationshipsSameEntityRepository;

    private final TestTwoRelationshipsSameEntitySearchRepository testTwoRelationshipsSameEntitySearchRepository;

    public TestTwoRelationshipsSameEntityResource(TestTwoRelationshipsSameEntityRepository testTwoRelationshipsSameEntityRepository, TestTwoRelationshipsSameEntitySearchRepository testTwoRelationshipsSameEntitySearchRepository) {
        this.testTwoRelationshipsSameEntityRepository = testTwoRelationshipsSameEntityRepository;
        this.testTwoRelationshipsSameEntitySearchRepository = testTwoRelationshipsSameEntitySearchRepository;
    }

    /**
     * POST  /test-two-relationships-same-entities : Create a new testTwoRelationshipsSameEntity.
     *
     * @param testTwoRelationshipsSameEntity the testTwoRelationshipsSameEntity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testTwoRelationshipsSameEntity, or with status 400 (Bad Request) if the testTwoRelationshipsSameEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-two-relationships-same-entities")
    @Timed
    public ResponseEntity<TestTwoRelationshipsSameEntity> createTestTwoRelationshipsSameEntity(@Valid @RequestBody TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity) throws URISyntaxException {
        log.debug("REST request to save TestTwoRelationshipsSameEntity : {}", testTwoRelationshipsSameEntity);
        if (testTwoRelationshipsSameEntity.getId() != null) {
            throw new BadRequestAlertException("A new testTwoRelationshipsSameEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestTwoRelationshipsSameEntity result = testTwoRelationshipsSameEntityRepository.save(testTwoRelationshipsSameEntity);
        testTwoRelationshipsSameEntitySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/test-two-relationships-same-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-two-relationships-same-entities : Updates an existing testTwoRelationshipsSameEntity.
     *
     * @param testTwoRelationshipsSameEntity the testTwoRelationshipsSameEntity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testTwoRelationshipsSameEntity,
     * or with status 400 (Bad Request) if the testTwoRelationshipsSameEntity is not valid,
     * or with status 500 (Internal Server Error) if the testTwoRelationshipsSameEntity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-two-relationships-same-entities")
    @Timed
    public ResponseEntity<TestTwoRelationshipsSameEntity> updateTestTwoRelationshipsSameEntity(@Valid @RequestBody TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity) throws URISyntaxException {
        log.debug("REST request to update TestTwoRelationshipsSameEntity : {}", testTwoRelationshipsSameEntity);
        if (testTwoRelationshipsSameEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestTwoRelationshipsSameEntity result = testTwoRelationshipsSameEntityRepository.save(testTwoRelationshipsSameEntity);
        testTwoRelationshipsSameEntitySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testTwoRelationshipsSameEntity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-two-relationships-same-entities : get all the testTwoRelationshipsSameEntities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testTwoRelationshipsSameEntities in body
     */
    @GetMapping("/test-two-relationships-same-entities")
    @Timed
    public List<TestTwoRelationshipsSameEntity> getAllTestTwoRelationshipsSameEntities() {
        log.debug("REST request to get all TestTwoRelationshipsSameEntities");
        return testTwoRelationshipsSameEntityRepository.findAll();
    }

    /**
     * GET  /test-two-relationships-same-entities/:id : get the "id" testTwoRelationshipsSameEntity.
     *
     * @param id the id of the testTwoRelationshipsSameEntity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testTwoRelationshipsSameEntity, or with status 404 (Not Found)
     */
    @GetMapping("/test-two-relationships-same-entities/{id}")
    @Timed
    public ResponseEntity<TestTwoRelationshipsSameEntity> getTestTwoRelationshipsSameEntity(@PathVariable Long id) {
        log.debug("REST request to get TestTwoRelationshipsSameEntity : {}", id);
        Optional<TestTwoRelationshipsSameEntity> testTwoRelationshipsSameEntity = testTwoRelationshipsSameEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(testTwoRelationshipsSameEntity);
    }

    /**
     * DELETE  /test-two-relationships-same-entities/:id : delete the "id" testTwoRelationshipsSameEntity.
     *
     * @param id the id of the testTwoRelationshipsSameEntity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-two-relationships-same-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestTwoRelationshipsSameEntity(@PathVariable Long id) {
        log.debug("REST request to delete TestTwoRelationshipsSameEntity : {}", id);

        testTwoRelationshipsSameEntityRepository.deleteById(id);
        testTwoRelationshipsSameEntitySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-two-relationships-same-entities?query=:query : search for the testTwoRelationshipsSameEntity corresponding
     * to the query.
     *
     * @param query the query of the testTwoRelationshipsSameEntity search
     * @return the result of the search
     */
    @GetMapping("/_search/test-two-relationships-same-entities")
    @Timed
    public List<TestTwoRelationshipsSameEntity> searchTestTwoRelationshipsSameEntities(@RequestParam String query) {
        log.debug("REST request to search TestTwoRelationshipsSameEntities for query {}", query);
        return StreamSupport
            .stream(testTwoRelationshipsSameEntitySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
