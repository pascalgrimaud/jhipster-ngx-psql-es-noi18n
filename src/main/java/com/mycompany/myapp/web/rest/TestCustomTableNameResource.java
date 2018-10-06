package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TestCustomTableName;
import com.mycompany.myapp.repository.TestCustomTableNameRepository;
import com.mycompany.myapp.repository.search.TestCustomTableNameSearchRepository;
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
 * REST controller for managing TestCustomTableName.
 */
@RestController
@RequestMapping("/api")
public class TestCustomTableNameResource {

    private final Logger log = LoggerFactory.getLogger(TestCustomTableNameResource.class);

    private static final String ENTITY_NAME = "testCustomTableName";

    private final TestCustomTableNameRepository testCustomTableNameRepository;

    private final TestCustomTableNameSearchRepository testCustomTableNameSearchRepository;

    public TestCustomTableNameResource(TestCustomTableNameRepository testCustomTableNameRepository, TestCustomTableNameSearchRepository testCustomTableNameSearchRepository) {
        this.testCustomTableNameRepository = testCustomTableNameRepository;
        this.testCustomTableNameSearchRepository = testCustomTableNameSearchRepository;
    }

    /**
     * POST  /test-custom-table-names : Create a new testCustomTableName.
     *
     * @param testCustomTableName the testCustomTableName to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testCustomTableName, or with status 400 (Bad Request) if the testCustomTableName has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-custom-table-names")
    @Timed
    public ResponseEntity<TestCustomTableName> createTestCustomTableName(@Valid @RequestBody TestCustomTableName testCustomTableName) throws URISyntaxException {
        log.debug("REST request to save TestCustomTableName : {}", testCustomTableName);
        if (testCustomTableName.getId() != null) {
            throw new BadRequestAlertException("A new testCustomTableName cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestCustomTableName result = testCustomTableNameRepository.save(testCustomTableName);
        testCustomTableNameSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/test-custom-table-names/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-custom-table-names : Updates an existing testCustomTableName.
     *
     * @param testCustomTableName the testCustomTableName to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testCustomTableName,
     * or with status 400 (Bad Request) if the testCustomTableName is not valid,
     * or with status 500 (Internal Server Error) if the testCustomTableName couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-custom-table-names")
    @Timed
    public ResponseEntity<TestCustomTableName> updateTestCustomTableName(@Valid @RequestBody TestCustomTableName testCustomTableName) throws URISyntaxException {
        log.debug("REST request to update TestCustomTableName : {}", testCustomTableName);
        if (testCustomTableName.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestCustomTableName result = testCustomTableNameRepository.save(testCustomTableName);
        testCustomTableNameSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testCustomTableName.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-custom-table-names : get all the testCustomTableNames.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testCustomTableNames in body
     */
    @GetMapping("/test-custom-table-names")
    @Timed
    public List<TestCustomTableName> getAllTestCustomTableNames(@RequestParam(required = false) String filter,@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if ("testonetoone-is-null".equals(filter)) {
            log.debug("REST request to get all TestCustomTableNames where testOneToOne is null");
            return StreamSupport
                .stream(testCustomTableNameRepository.findAll().spliterator(), false)
                .filter(testCustomTableName -> testCustomTableName.getTestOneToOne() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all TestCustomTableNames");
        return testCustomTableNameRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /test-custom-table-names/:id : get the "id" testCustomTableName.
     *
     * @param id the id of the testCustomTableName to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testCustomTableName, or with status 404 (Not Found)
     */
    @GetMapping("/test-custom-table-names/{id}")
    @Timed
    public ResponseEntity<TestCustomTableName> getTestCustomTableName(@PathVariable Long id) {
        log.debug("REST request to get TestCustomTableName : {}", id);
        Optional<TestCustomTableName> testCustomTableName = testCustomTableNameRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(testCustomTableName);
    }

    /**
     * DELETE  /test-custom-table-names/:id : delete the "id" testCustomTableName.
     *
     * @param id the id of the testCustomTableName to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-custom-table-names/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestCustomTableName(@PathVariable Long id) {
        log.debug("REST request to delete TestCustomTableName : {}", id);

        testCustomTableNameRepository.deleteById(id);
        testCustomTableNameSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-custom-table-names?query=:query : search for the testCustomTableName corresponding
     * to the query.
     *
     * @param query the query of the testCustomTableName search
     * @return the result of the search
     */
    @GetMapping("/_search/test-custom-table-names")
    @Timed
    public List<TestCustomTableName> searchTestCustomTableNames(@RequestParam String query) {
        log.debug("REST request to search TestCustomTableNames for query {}", query);
        return StreamSupport
            .stream(testCustomTableNameSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
