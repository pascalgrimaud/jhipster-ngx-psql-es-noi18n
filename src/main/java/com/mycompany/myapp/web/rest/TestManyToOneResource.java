package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TestManyToOne;
import com.mycompany.myapp.repository.TestManyToOneRepository;
import com.mycompany.myapp.repository.search.TestManyToOneSearchRepository;
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
 * REST controller for managing TestManyToOne.
 */
@RestController
@RequestMapping("/api")
public class TestManyToOneResource {

    private final Logger log = LoggerFactory.getLogger(TestManyToOneResource.class);

    private static final String ENTITY_NAME = "testManyToOne";

    private final TestManyToOneRepository testManyToOneRepository;

    private final TestManyToOneSearchRepository testManyToOneSearchRepository;

    public TestManyToOneResource(TestManyToOneRepository testManyToOneRepository, TestManyToOneSearchRepository testManyToOneSearchRepository) {
        this.testManyToOneRepository = testManyToOneRepository;
        this.testManyToOneSearchRepository = testManyToOneSearchRepository;
    }

    /**
     * POST  /test-many-to-ones : Create a new testManyToOne.
     *
     * @param testManyToOne the testManyToOne to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testManyToOne, or with status 400 (Bad Request) if the testManyToOne has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-many-to-ones")
    @Timed
    public ResponseEntity<TestManyToOne> createTestManyToOne(@RequestBody TestManyToOne testManyToOne) throws URISyntaxException {
        log.debug("REST request to save TestManyToOne : {}", testManyToOne);
        if (testManyToOne.getId() != null) {
            throw new BadRequestAlertException("A new testManyToOne cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestManyToOne result = testManyToOneRepository.save(testManyToOne);
        testManyToOneSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/test-many-to-ones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-many-to-ones : Updates an existing testManyToOne.
     *
     * @param testManyToOne the testManyToOne to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testManyToOne,
     * or with status 400 (Bad Request) if the testManyToOne is not valid,
     * or with status 500 (Internal Server Error) if the testManyToOne couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-many-to-ones")
    @Timed
    public ResponseEntity<TestManyToOne> updateTestManyToOne(@RequestBody TestManyToOne testManyToOne) throws URISyntaxException {
        log.debug("REST request to update TestManyToOne : {}", testManyToOne);
        if (testManyToOne.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestManyToOne result = testManyToOneRepository.save(testManyToOne);
        testManyToOneSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testManyToOne.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-many-to-ones : get all the testManyToOnes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testManyToOnes in body
     */
    @GetMapping("/test-many-to-ones")
    @Timed
    public List<TestManyToOne> getAllTestManyToOnes() {
        log.debug("REST request to get all TestManyToOnes");
        return testManyToOneRepository.findAll();
    }

    /**
     * GET  /test-many-to-ones/:id : get the "id" testManyToOne.
     *
     * @param id the id of the testManyToOne to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testManyToOne, or with status 404 (Not Found)
     */
    @GetMapping("/test-many-to-ones/{id}")
    @Timed
    public ResponseEntity<TestManyToOne> getTestManyToOne(@PathVariable Long id) {
        log.debug("REST request to get TestManyToOne : {}", id);
        Optional<TestManyToOne> testManyToOne = testManyToOneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(testManyToOne);
    }

    /**
     * DELETE  /test-many-to-ones/:id : delete the "id" testManyToOne.
     *
     * @param id the id of the testManyToOne to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-many-to-ones/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestManyToOne(@PathVariable Long id) {
        log.debug("REST request to delete TestManyToOne : {}", id);

        testManyToOneRepository.deleteById(id);
        testManyToOneSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-many-to-ones?query=:query : search for the testManyToOne corresponding
     * to the query.
     *
     * @param query the query of the testManyToOne search
     * @return the result of the search
     */
    @GetMapping("/_search/test-many-to-ones")
    @Timed
    public List<TestManyToOne> searchTestManyToOnes(@RequestParam String query) {
        log.debug("REST request to search TestManyToOnes for query {}", query);
        return StreamSupport
            .stream(testManyToOneSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
