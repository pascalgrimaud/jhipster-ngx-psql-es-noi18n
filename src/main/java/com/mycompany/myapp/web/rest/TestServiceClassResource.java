package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TestServiceClass;
import com.mycompany.myapp.service.TestServiceClassService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.TestServiceClassCriteria;
import com.mycompany.myapp.service.TestServiceClassQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TestServiceClass.
 */
@RestController
@RequestMapping("/api")
public class TestServiceClassResource {

    private final Logger log = LoggerFactory.getLogger(TestServiceClassResource.class);

    private static final String ENTITY_NAME = "testServiceClass";

    private final TestServiceClassService testServiceClassService;

    private final TestServiceClassQueryService testServiceClassQueryService;

    public TestServiceClassResource(TestServiceClassService testServiceClassService, TestServiceClassQueryService testServiceClassQueryService) {
        this.testServiceClassService = testServiceClassService;
        this.testServiceClassQueryService = testServiceClassQueryService;
    }

    /**
     * POST  /test-service-classes : Create a new testServiceClass.
     *
     * @param testServiceClass the testServiceClass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testServiceClass, or with status 400 (Bad Request) if the testServiceClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-service-classes")
    @Timed
    public ResponseEntity<TestServiceClass> createTestServiceClass(@RequestBody TestServiceClass testServiceClass) throws URISyntaxException {
        log.debug("REST request to save TestServiceClass : {}", testServiceClass);
        if (testServiceClass.getId() != null) {
            throw new BadRequestAlertException("A new testServiceClass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestServiceClass result = testServiceClassService.save(testServiceClass);
        return ResponseEntity.created(new URI("/api/test-service-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-service-classes : Updates an existing testServiceClass.
     *
     * @param testServiceClass the testServiceClass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testServiceClass,
     * or with status 400 (Bad Request) if the testServiceClass is not valid,
     * or with status 500 (Internal Server Error) if the testServiceClass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-service-classes")
    @Timed
    public ResponseEntity<TestServiceClass> updateTestServiceClass(@RequestBody TestServiceClass testServiceClass) throws URISyntaxException {
        log.debug("REST request to update TestServiceClass : {}", testServiceClass);
        if (testServiceClass.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestServiceClass result = testServiceClassService.save(testServiceClass);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testServiceClass.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-service-classes : get all the testServiceClasses.
     *
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of testServiceClasses in body
     */
    @GetMapping("/test-service-classes")
    @Timed
    public ResponseEntity<List<TestServiceClass>> getAllTestServiceClasses(TestServiceClassCriteria criteria) {
        log.debug("REST request to get TestServiceClasses by criteria: {}", criteria);
        List<TestServiceClass> entityList = testServiceClassQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
    * GET  /test-service-classes/count : count all the testServiceClasses.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/test-service-classes/count")
    @Timed
    public ResponseEntity<Long> countTestServiceClasses (TestServiceClassCriteria criteria) {
        log.debug("REST request to count TestServiceClasses by criteria: {}", criteria);
        return ResponseEntity.ok().body(testServiceClassQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /test-service-classes/:id : get the "id" testServiceClass.
     *
     * @param id the id of the testServiceClass to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testServiceClass, or with status 404 (Not Found)
     */
    @GetMapping("/test-service-classes/{id}")
    @Timed
    public ResponseEntity<TestServiceClass> getTestServiceClass(@PathVariable Long id) {
        log.debug("REST request to get TestServiceClass : {}", id);
        Optional<TestServiceClass> testServiceClass = testServiceClassService.findOne(id);
        return ResponseUtil.wrapOrNotFound(testServiceClass);
    }

    /**
     * DELETE  /test-service-classes/:id : delete the "id" testServiceClass.
     *
     * @param id the id of the testServiceClass to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-service-classes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestServiceClass(@PathVariable Long id) {
        log.debug("REST request to delete TestServiceClass : {}", id);
        testServiceClassService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-service-classes?query=:query : search for the testServiceClass corresponding
     * to the query.
     *
     * @param query the query of the testServiceClass search
     * @return the result of the search
     */
    @GetMapping("/_search/test-service-classes")
    @Timed
    public List<TestServiceClass> searchTestServiceClasses(@RequestParam String query) {
        log.debug("REST request to search TestServiceClasses for query {}", query);
        return testServiceClassService.search(query);
    }

}
