package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TestOneToOne;
import com.mycompany.myapp.repository.TestOneToOneRepository;
import com.mycompany.myapp.repository.search.TestOneToOneSearchRepository;
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
 * REST controller for managing TestOneToOne.
 */
@RestController
@RequestMapping("/api")
public class TestOneToOneResource {

    private final Logger log = LoggerFactory.getLogger(TestOneToOneResource.class);

    private static final String ENTITY_NAME = "testOneToOne";

    private final TestOneToOneRepository testOneToOneRepository;

    private final TestOneToOneSearchRepository testOneToOneSearchRepository;

    public TestOneToOneResource(TestOneToOneRepository testOneToOneRepository, TestOneToOneSearchRepository testOneToOneSearchRepository) {
        this.testOneToOneRepository = testOneToOneRepository;
        this.testOneToOneSearchRepository = testOneToOneSearchRepository;
    }

    /**
     * POST  /test-one-to-ones : Create a new testOneToOne.
     *
     * @param testOneToOne the testOneToOne to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testOneToOne, or with status 400 (Bad Request) if the testOneToOne has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-one-to-ones")
    @Timed
    public ResponseEntity<TestOneToOne> createTestOneToOne(@RequestBody TestOneToOne testOneToOne) throws URISyntaxException {
        log.debug("REST request to save TestOneToOne : {}", testOneToOne);
        if (testOneToOne.getId() != null) {
            throw new BadRequestAlertException("A new testOneToOne cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestOneToOne result = testOneToOneRepository.save(testOneToOne);
        testOneToOneSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/test-one-to-ones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-one-to-ones : Updates an existing testOneToOne.
     *
     * @param testOneToOne the testOneToOne to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testOneToOne,
     * or with status 400 (Bad Request) if the testOneToOne is not valid,
     * or with status 500 (Internal Server Error) if the testOneToOne couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-one-to-ones")
    @Timed
    public ResponseEntity<TestOneToOne> updateTestOneToOne(@RequestBody TestOneToOne testOneToOne) throws URISyntaxException {
        log.debug("REST request to update TestOneToOne : {}", testOneToOne);
        if (testOneToOne.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestOneToOne result = testOneToOneRepository.save(testOneToOne);
        testOneToOneSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testOneToOne.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-one-to-ones : get all the testOneToOnes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testOneToOnes in body
     */
    @GetMapping("/test-one-to-ones")
    @Timed
    public List<TestOneToOne> getAllTestOneToOnes() {
        log.debug("REST request to get all TestOneToOnes");
        return testOneToOneRepository.findAll();
    }

    /**
     * GET  /test-one-to-ones/:id : get the "id" testOneToOne.
     *
     * @param id the id of the testOneToOne to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testOneToOne, or with status 404 (Not Found)
     */
    @GetMapping("/test-one-to-ones/{id}")
    @Timed
    public ResponseEntity<TestOneToOne> getTestOneToOne(@PathVariable Long id) {
        log.debug("REST request to get TestOneToOne : {}", id);
        Optional<TestOneToOne> testOneToOne = testOneToOneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(testOneToOne);
    }

    /**
     * DELETE  /test-one-to-ones/:id : delete the "id" testOneToOne.
     *
     * @param id the id of the testOneToOne to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-one-to-ones/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestOneToOne(@PathVariable Long id) {
        log.debug("REST request to delete TestOneToOne : {}", id);

        testOneToOneRepository.deleteById(id);
        testOneToOneSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-one-to-ones?query=:query : search for the testOneToOne corresponding
     * to the query.
     *
     * @param query the query of the testOneToOne search
     * @return the result of the search
     */
    @GetMapping("/_search/test-one-to-ones")
    @Timed
    public List<TestOneToOne> searchTestOneToOnes(@RequestParam String query) {
        log.debug("REST request to search TestOneToOnes for query {}", query);
        return StreamSupport
            .stream(testOneToOneSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
