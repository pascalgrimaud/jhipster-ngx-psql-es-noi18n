package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TestPagination;
import com.mycompany.myapp.repository.TestPaginationRepository;
import com.mycompany.myapp.repository.search.TestPaginationSearchRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
 * REST controller for managing TestPagination.
 */
@RestController
@RequestMapping("/api")
public class TestPaginationResource {

    private final Logger log = LoggerFactory.getLogger(TestPaginationResource.class);

    private static final String ENTITY_NAME = "testPagination";

    private final TestPaginationRepository testPaginationRepository;

    private final TestPaginationSearchRepository testPaginationSearchRepository;

    public TestPaginationResource(TestPaginationRepository testPaginationRepository, TestPaginationSearchRepository testPaginationSearchRepository) {
        this.testPaginationRepository = testPaginationRepository;
        this.testPaginationSearchRepository = testPaginationSearchRepository;
    }

    /**
     * POST  /test-paginations : Create a new testPagination.
     *
     * @param testPagination the testPagination to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testPagination, or with status 400 (Bad Request) if the testPagination has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-paginations")
    @Timed
    public ResponseEntity<TestPagination> createTestPagination(@RequestBody TestPagination testPagination) throws URISyntaxException {
        log.debug("REST request to save TestPagination : {}", testPagination);
        if (testPagination.getId() != null) {
            throw new BadRequestAlertException("A new testPagination cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestPagination result = testPaginationRepository.save(testPagination);
        testPaginationSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/test-paginations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-paginations : Updates an existing testPagination.
     *
     * @param testPagination the testPagination to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testPagination,
     * or with status 400 (Bad Request) if the testPagination is not valid,
     * or with status 500 (Internal Server Error) if the testPagination couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-paginations")
    @Timed
    public ResponseEntity<TestPagination> updateTestPagination(@RequestBody TestPagination testPagination) throws URISyntaxException {
        log.debug("REST request to update TestPagination : {}", testPagination);
        if (testPagination.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestPagination result = testPaginationRepository.save(testPagination);
        testPaginationSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testPagination.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-paginations : get all the testPaginations.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testPaginations in body
     */
    @GetMapping("/test-paginations")
    @Timed
    public ResponseEntity<List<TestPagination>> getAllTestPaginations(Pageable pageable, @RequestParam(required = false) String filter, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if ("testonetoone-is-null".equals(filter)) {
            log.debug("REST request to get all TestPaginations where testOneToOne is null");
            return new ResponseEntity<>(StreamSupport
                .stream(testPaginationRepository.findAll().spliterator(), false)
                .filter(testPagination -> testPagination.getTestOneToOne() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of TestPaginations");
        Page<TestPagination> page;
        if (eagerload) {
            page = testPaginationRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = testPaginationRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/test-paginations?eagerload=%b", eagerload));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /test-paginations/:id : get the "id" testPagination.
     *
     * @param id the id of the testPagination to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testPagination, or with status 404 (Not Found)
     */
    @GetMapping("/test-paginations/{id}")
    @Timed
    public ResponseEntity<TestPagination> getTestPagination(@PathVariable Long id) {
        log.debug("REST request to get TestPagination : {}", id);
        Optional<TestPagination> testPagination = testPaginationRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(testPagination);
    }

    /**
     * DELETE  /test-paginations/:id : delete the "id" testPagination.
     *
     * @param id the id of the testPagination to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-paginations/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestPagination(@PathVariable Long id) {
        log.debug("REST request to delete TestPagination : {}", id);

        testPaginationRepository.deleteById(id);
        testPaginationSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-paginations?query=:query : search for the testPagination corresponding
     * to the query.
     *
     * @param query the query of the testPagination search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/test-paginations")
    @Timed
    public ResponseEntity<List<TestPagination>> searchTestPaginations(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TestPaginations for query {}", query);
        Page<TestPagination> page = testPaginationSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/test-paginations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
