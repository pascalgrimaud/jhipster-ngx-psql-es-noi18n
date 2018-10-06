package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TestServiceImpl;
import com.mycompany.myapp.service.TestServiceImplService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.TestServiceImplCriteria;
import com.mycompany.myapp.service.TestServiceImplQueryService;
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
 * REST controller for managing TestServiceImpl.
 */
@RestController
@RequestMapping("/api")
public class TestServiceImplResource {

    private final Logger log = LoggerFactory.getLogger(TestServiceImplResource.class);

    private static final String ENTITY_NAME = "testServiceImpl";

    private final TestServiceImplService testServiceImplService;

    private final TestServiceImplQueryService testServiceImplQueryService;

    public TestServiceImplResource(TestServiceImplService testServiceImplService, TestServiceImplQueryService testServiceImplQueryService) {
        this.testServiceImplService = testServiceImplService;
        this.testServiceImplQueryService = testServiceImplQueryService;
    }

    /**
     * POST  /test-service-impls : Create a new testServiceImpl.
     *
     * @param testServiceImpl the testServiceImpl to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testServiceImpl, or with status 400 (Bad Request) if the testServiceImpl has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-service-impls")
    @Timed
    public ResponseEntity<TestServiceImpl> createTestServiceImpl(@RequestBody TestServiceImpl testServiceImpl) throws URISyntaxException {
        log.debug("REST request to save TestServiceImpl : {}", testServiceImpl);
        if (testServiceImpl.getId() != null) {
            throw new BadRequestAlertException("A new testServiceImpl cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestServiceImpl result = testServiceImplService.save(testServiceImpl);
        return ResponseEntity.created(new URI("/api/test-service-impls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-service-impls : Updates an existing testServiceImpl.
     *
     * @param testServiceImpl the testServiceImpl to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testServiceImpl,
     * or with status 400 (Bad Request) if the testServiceImpl is not valid,
     * or with status 500 (Internal Server Error) if the testServiceImpl couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-service-impls")
    @Timed
    public ResponseEntity<TestServiceImpl> updateTestServiceImpl(@RequestBody TestServiceImpl testServiceImpl) throws URISyntaxException {
        log.debug("REST request to update TestServiceImpl : {}", testServiceImpl);
        if (testServiceImpl.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestServiceImpl result = testServiceImplService.save(testServiceImpl);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testServiceImpl.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-service-impls : get all the testServiceImpls.
     *
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of testServiceImpls in body
     */
    @GetMapping("/test-service-impls")
    @Timed
    public ResponseEntity<List<TestServiceImpl>> getAllTestServiceImpls(TestServiceImplCriteria criteria) {
        log.debug("REST request to get TestServiceImpls by criteria: {}", criteria);
        List<TestServiceImpl> entityList = testServiceImplQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
    * GET  /test-service-impls/count : count all the testServiceImpls.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/test-service-impls/count")
    @Timed
    public ResponseEntity<Long> countTestServiceImpls (TestServiceImplCriteria criteria) {
        log.debug("REST request to count TestServiceImpls by criteria: {}", criteria);
        return ResponseEntity.ok().body(testServiceImplQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /test-service-impls/:id : get the "id" testServiceImpl.
     *
     * @param id the id of the testServiceImpl to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testServiceImpl, or with status 404 (Not Found)
     */
    @GetMapping("/test-service-impls/{id}")
    @Timed
    public ResponseEntity<TestServiceImpl> getTestServiceImpl(@PathVariable Long id) {
        log.debug("REST request to get TestServiceImpl : {}", id);
        Optional<TestServiceImpl> testServiceImpl = testServiceImplService.findOne(id);
        return ResponseUtil.wrapOrNotFound(testServiceImpl);
    }

    /**
     * DELETE  /test-service-impls/:id : delete the "id" testServiceImpl.
     *
     * @param id the id of the testServiceImpl to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-service-impls/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestServiceImpl(@PathVariable Long id) {
        log.debug("REST request to delete TestServiceImpl : {}", id);
        testServiceImplService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-service-impls?query=:query : search for the testServiceImpl corresponding
     * to the query.
     *
     * @param query the query of the testServiceImpl search
     * @return the result of the search
     */
    @GetMapping("/_search/test-service-impls")
    @Timed
    public List<TestServiceImpl> searchTestServiceImpls(@RequestParam String query) {
        log.debug("REST request to search TestServiceImpls for query {}", query);
        return testServiceImplService.search(query);
    }

}
