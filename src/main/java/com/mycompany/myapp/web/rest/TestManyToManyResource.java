package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TestManyToMany;
import com.mycompany.myapp.repository.TestManyToManyRepository;
import com.mycompany.myapp.repository.search.TestManyToManySearchRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TestManyToMany.
 */
@RestController
@RequestMapping("/api")
public class TestManyToManyResource {

    private final Logger log = LoggerFactory.getLogger(TestManyToManyResource.class);

    private static final String ENTITY_NAME = "testManyToMany";

    private final TestManyToManyRepository testManyToManyRepository;

    private final TestManyToManySearchRepository testManyToManySearchRepository;

    public TestManyToManyResource(TestManyToManyRepository testManyToManyRepository, TestManyToManySearchRepository testManyToManySearchRepository) {
        this.testManyToManyRepository = testManyToManyRepository;
        this.testManyToManySearchRepository = testManyToManySearchRepository;
    }

    /**
     * POST  /test-many-to-manies : Create a new testManyToMany.
     *
     * @param testManyToMany the testManyToMany to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testManyToMany, or with status 400 (Bad Request) if the testManyToMany has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-many-to-manies")
    @Timed
    public ResponseEntity<TestManyToMany> createTestManyToMany(@RequestBody TestManyToMany testManyToMany) throws URISyntaxException {
        log.debug("REST request to save TestManyToMany : {}", testManyToMany);
        if (testManyToMany.getId() != null) {
            throw new BadRequestAlertException("A new testManyToMany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestManyToMany result = testManyToManyRepository.save(testManyToMany);
        testManyToManySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/test-many-to-manies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-many-to-manies : Updates an existing testManyToMany.
     *
     * @param testManyToMany the testManyToMany to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testManyToMany,
     * or with status 400 (Bad Request) if the testManyToMany is not valid,
     * or with status 500 (Internal Server Error) if the testManyToMany couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-many-to-manies")
    @Timed
    public ResponseEntity<TestManyToMany> updateTestManyToMany(@RequestBody TestManyToMany testManyToMany) throws URISyntaxException {
        log.debug("REST request to update TestManyToMany : {}", testManyToMany);
        if (testManyToMany.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestManyToMany result = testManyToManyRepository.save(testManyToMany);
        testManyToManySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testManyToMany.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-many-to-manies : get all the testManyToManies.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of testManyToManies in body
     */
    @GetMapping("/test-many-to-manies")
    @Timed
    public List<TestManyToMany> getAllTestManyToManies(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all TestManyToManies");
        return testManyToManyRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /test-many-to-manies/:id : get the "id" testManyToMany.
     *
     * @param id the id of the testManyToMany to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testManyToMany, or with status 404 (Not Found)
     */
    @GetMapping("/test-many-to-manies/{id}")
    @Timed
    public ResponseEntity<TestManyToMany> getTestManyToMany(@PathVariable Long id) {
        log.debug("REST request to get TestManyToMany : {}", id);
        Optional<TestManyToMany> testManyToMany = testManyToManyRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(testManyToMany);
    }

    /**
     * DELETE  /test-many-to-manies/:id : delete the "id" testManyToMany.
     *
     * @param id the id of the testManyToMany to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-many-to-manies/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestManyToMany(@PathVariable Long id) {
        log.debug("REST request to delete TestManyToMany : {}", id);

        testManyToManyRepository.deleteById(id);
        testManyToManySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-many-to-manies?query=:query : search for the testManyToMany corresponding
     * to the query.
     *
     * @param query the query of the testManyToMany search
     * @return the result of the search
     */
    @GetMapping("/_search/test-many-to-manies")
    @Timed
    public List<TestManyToMany> searchTestManyToManies(@RequestParam String query) {
        log.debug("REST request to search TestManyToManies for query {}", query);
        return StreamSupport
            .stream(testManyToManySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
