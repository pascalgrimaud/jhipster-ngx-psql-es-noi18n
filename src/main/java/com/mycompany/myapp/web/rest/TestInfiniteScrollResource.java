package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TestInfiniteScroll;
import com.mycompany.myapp.repository.TestInfiniteScrollRepository;
import com.mycompany.myapp.repository.search.TestInfiniteScrollSearchRepository;
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
 * REST controller for managing TestInfiniteScroll.
 */
@RestController
@RequestMapping("/api")
public class TestInfiniteScrollResource {

    private final Logger log = LoggerFactory.getLogger(TestInfiniteScrollResource.class);

    private static final String ENTITY_NAME = "testInfiniteScroll";

    private final TestInfiniteScrollRepository testInfiniteScrollRepository;

    private final TestInfiniteScrollSearchRepository testInfiniteScrollSearchRepository;

    public TestInfiniteScrollResource(TestInfiniteScrollRepository testInfiniteScrollRepository, TestInfiniteScrollSearchRepository testInfiniteScrollSearchRepository) {
        this.testInfiniteScrollRepository = testInfiniteScrollRepository;
        this.testInfiniteScrollSearchRepository = testInfiniteScrollSearchRepository;
    }

    /**
     * POST  /test-infinite-scrolls : Create a new testInfiniteScroll.
     *
     * @param testInfiniteScroll the testInfiniteScroll to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testInfiniteScroll, or with status 400 (Bad Request) if the testInfiniteScroll has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-infinite-scrolls")
    @Timed
    public ResponseEntity<TestInfiniteScroll> createTestInfiniteScroll(@RequestBody TestInfiniteScroll testInfiniteScroll) throws URISyntaxException {
        log.debug("REST request to save TestInfiniteScroll : {}", testInfiniteScroll);
        if (testInfiniteScroll.getId() != null) {
            throw new BadRequestAlertException("A new testInfiniteScroll cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestInfiniteScroll result = testInfiniteScrollRepository.save(testInfiniteScroll);
        testInfiniteScrollSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/test-infinite-scrolls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-infinite-scrolls : Updates an existing testInfiniteScroll.
     *
     * @param testInfiniteScroll the testInfiniteScroll to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testInfiniteScroll,
     * or with status 400 (Bad Request) if the testInfiniteScroll is not valid,
     * or with status 500 (Internal Server Error) if the testInfiniteScroll couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-infinite-scrolls")
    @Timed
    public ResponseEntity<TestInfiniteScroll> updateTestInfiniteScroll(@RequestBody TestInfiniteScroll testInfiniteScroll) throws URISyntaxException {
        log.debug("REST request to update TestInfiniteScroll : {}", testInfiniteScroll);
        if (testInfiniteScroll.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestInfiniteScroll result = testInfiniteScrollRepository.save(testInfiniteScroll);
        testInfiniteScrollSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testInfiniteScroll.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-infinite-scrolls : get all the testInfiniteScrolls.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testInfiniteScrolls in body
     */
    @GetMapping("/test-infinite-scrolls")
    @Timed
    public ResponseEntity<List<TestInfiniteScroll>> getAllTestInfiniteScrolls(Pageable pageable, @RequestParam(required = false) String filter, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if ("testonetoone-is-null".equals(filter)) {
            log.debug("REST request to get all TestInfiniteScrolls where testOneToOne is null");
            return new ResponseEntity<>(StreamSupport
                .stream(testInfiniteScrollRepository.findAll().spliterator(), false)
                .filter(testInfiniteScroll -> testInfiniteScroll.getTestOneToOne() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of TestInfiniteScrolls");
        Page<TestInfiniteScroll> page;
        if (eagerload) {
            page = testInfiniteScrollRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = testInfiniteScrollRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/test-infinite-scrolls?eagerload=%b", eagerload));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /test-infinite-scrolls/:id : get the "id" testInfiniteScroll.
     *
     * @param id the id of the testInfiniteScroll to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testInfiniteScroll, or with status 404 (Not Found)
     */
    @GetMapping("/test-infinite-scrolls/{id}")
    @Timed
    public ResponseEntity<TestInfiniteScroll> getTestInfiniteScroll(@PathVariable Long id) {
        log.debug("REST request to get TestInfiniteScroll : {}", id);
        Optional<TestInfiniteScroll> testInfiniteScroll = testInfiniteScrollRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(testInfiniteScroll);
    }

    /**
     * DELETE  /test-infinite-scrolls/:id : delete the "id" testInfiniteScroll.
     *
     * @param id the id of the testInfiniteScroll to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-infinite-scrolls/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestInfiniteScroll(@PathVariable Long id) {
        log.debug("REST request to delete TestInfiniteScroll : {}", id);

        testInfiniteScrollRepository.deleteById(id);
        testInfiniteScrollSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-infinite-scrolls?query=:query : search for the testInfiniteScroll corresponding
     * to the query.
     *
     * @param query the query of the testInfiniteScroll search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/test-infinite-scrolls")
    @Timed
    public ResponseEntity<List<TestInfiniteScroll>> searchTestInfiniteScrolls(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TestInfiniteScrolls for query {}", query);
        Page<TestInfiniteScroll> page = testInfiniteScrollSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/test-infinite-scrolls");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
