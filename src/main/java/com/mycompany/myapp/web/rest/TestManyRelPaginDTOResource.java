package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.TestManyRelPaginDTOService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.TestManyRelPaginDTODTO;
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
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TestManyRelPaginDTO.
 */
@RestController
@RequestMapping("/api")
public class TestManyRelPaginDTOResource {

    private final Logger log = LoggerFactory.getLogger(TestManyRelPaginDTOResource.class);

    private static final String ENTITY_NAME = "testManyRelPaginDTO";

    private final TestManyRelPaginDTOService testManyRelPaginDTOService;

    public TestManyRelPaginDTOResource(TestManyRelPaginDTOService testManyRelPaginDTOService) {
        this.testManyRelPaginDTOService = testManyRelPaginDTOService;
    }

    /**
     * POST  /test-many-rel-pagin-dtos : Create a new testManyRelPaginDTO.
     *
     * @param testManyRelPaginDTODTO the testManyRelPaginDTODTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testManyRelPaginDTODTO, or with status 400 (Bad Request) if the testManyRelPaginDTO has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-many-rel-pagin-dtos")
    @Timed
    public ResponseEntity<TestManyRelPaginDTODTO> createTestManyRelPaginDTO(@RequestBody TestManyRelPaginDTODTO testManyRelPaginDTODTO) throws URISyntaxException {
        log.debug("REST request to save TestManyRelPaginDTO : {}", testManyRelPaginDTODTO);
        if (testManyRelPaginDTODTO.getId() != null) {
            throw new BadRequestAlertException("A new testManyRelPaginDTO cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestManyRelPaginDTODTO result = testManyRelPaginDTOService.save(testManyRelPaginDTODTO);
        return ResponseEntity.created(new URI("/api/test-many-rel-pagin-dtos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-many-rel-pagin-dtos : Updates an existing testManyRelPaginDTO.
     *
     * @param testManyRelPaginDTODTO the testManyRelPaginDTODTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testManyRelPaginDTODTO,
     * or with status 400 (Bad Request) if the testManyRelPaginDTODTO is not valid,
     * or with status 500 (Internal Server Error) if the testManyRelPaginDTODTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-many-rel-pagin-dtos")
    @Timed
    public ResponseEntity<TestManyRelPaginDTODTO> updateTestManyRelPaginDTO(@RequestBody TestManyRelPaginDTODTO testManyRelPaginDTODTO) throws URISyntaxException {
        log.debug("REST request to update TestManyRelPaginDTO : {}", testManyRelPaginDTODTO);
        if (testManyRelPaginDTODTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestManyRelPaginDTODTO result = testManyRelPaginDTOService.save(testManyRelPaginDTODTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testManyRelPaginDTODTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-many-rel-pagin-dtos : get all the testManyRelPaginDTOS.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of testManyRelPaginDTOS in body
     */
    @GetMapping("/test-many-rel-pagin-dtos")
    @Timed
    public ResponseEntity<List<TestManyRelPaginDTODTO>> getAllTestManyRelPaginDTOS(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of TestManyRelPaginDTOS");
        Page<TestManyRelPaginDTODTO> page;
        if (eagerload) {
            page = testManyRelPaginDTOService.findAllWithEagerRelationships(pageable);
        } else {
            page = testManyRelPaginDTOService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/test-many-rel-pagin-dtos?eagerload=%b", eagerload));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /test-many-rel-pagin-dtos/:id : get the "id" testManyRelPaginDTO.
     *
     * @param id the id of the testManyRelPaginDTODTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testManyRelPaginDTODTO, or with status 404 (Not Found)
     */
    @GetMapping("/test-many-rel-pagin-dtos/{id}")
    @Timed
    public ResponseEntity<TestManyRelPaginDTODTO> getTestManyRelPaginDTO(@PathVariable Long id) {
        log.debug("REST request to get TestManyRelPaginDTO : {}", id);
        Optional<TestManyRelPaginDTODTO> testManyRelPaginDTODTO = testManyRelPaginDTOService.findOne(id);
        return ResponseUtil.wrapOrNotFound(testManyRelPaginDTODTO);
    }

    /**
     * DELETE  /test-many-rel-pagin-dtos/:id : delete the "id" testManyRelPaginDTO.
     *
     * @param id the id of the testManyRelPaginDTODTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-many-rel-pagin-dtos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestManyRelPaginDTO(@PathVariable Long id) {
        log.debug("REST request to delete TestManyRelPaginDTO : {}", id);
        testManyRelPaginDTOService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-many-rel-pagin-dtos?query=:query : search for the testManyRelPaginDTO corresponding
     * to the query.
     *
     * @param query the query of the testManyRelPaginDTO search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/test-many-rel-pagin-dtos")
    @Timed
    public ResponseEntity<List<TestManyRelPaginDTODTO>> searchTestManyRelPaginDTOS(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TestManyRelPaginDTOS for query {}", query);
        Page<TestManyRelPaginDTODTO> page = testManyRelPaginDTOService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/test-many-rel-pagin-dtos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
