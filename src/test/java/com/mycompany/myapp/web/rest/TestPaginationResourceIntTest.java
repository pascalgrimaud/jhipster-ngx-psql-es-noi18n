package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestPagination;
import com.mycompany.myapp.repository.TestPaginationRepository;
import com.mycompany.myapp.repository.search.TestPaginationSearchRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TestPaginationResource REST controller.
 *
 * @see TestPaginationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestPaginationResourceIntTest {

    @Autowired
    private TestPaginationRepository testPaginationRepository;

    @Mock
    private TestPaginationRepository testPaginationRepositoryMock;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestPaginationSearchRepositoryMockConfiguration
     */
    @Autowired
    private TestPaginationSearchRepository mockTestPaginationSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestPaginationMockMvc;

    private TestPagination testPagination;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestPaginationResource testPaginationResource = new TestPaginationResource(testPaginationRepository, mockTestPaginationSearchRepository);
        this.restTestPaginationMockMvc = MockMvcBuilders.standaloneSetup(testPaginationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestPagination createEntity(EntityManager em) {
        TestPagination testPagination = new TestPagination();
        return testPagination;
    }

    @Before
    public void initTest() {
        testPagination = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestPagination() throws Exception {
        int databaseSizeBeforeCreate = testPaginationRepository.findAll().size();

        // Create the TestPagination
        restTestPaginationMockMvc.perform(post("/api/test-paginations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPagination)))
            .andExpect(status().isCreated());

        // Validate the TestPagination in the database
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeCreate + 1);
        TestPagination testTestPagination = testPaginationList.get(testPaginationList.size() - 1);

        // Validate the TestPagination in Elasticsearch
        verify(mockTestPaginationSearchRepository, times(1)).save(testTestPagination);
    }

    @Test
    @Transactional
    public void createTestPaginationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testPaginationRepository.findAll().size();

        // Create the TestPagination with an existing ID
        testPagination.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestPaginationMockMvc.perform(post("/api/test-paginations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPagination)))
            .andExpect(status().isBadRequest());

        // Validate the TestPagination in the database
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestPagination in Elasticsearch
        verify(mockTestPaginationSearchRepository, times(0)).save(testPagination);
    }

    @Test
    @Transactional
    public void getAllTestPaginations() throws Exception {
        // Initialize the database
        testPaginationRepository.saveAndFlush(testPagination);

        // Get all the testPaginationList
        restTestPaginationMockMvc.perform(get("/api/test-paginations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testPagination.getId().intValue())));
    }
    
    public void getAllTestPaginationsWithEagerRelationshipsIsEnabled() throws Exception {
        TestPaginationResource testPaginationResource = new TestPaginationResource(testPaginationRepositoryMock, mockTestPaginationSearchRepository);
        when(testPaginationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTestPaginationMockMvc = MockMvcBuilders.standaloneSetup(testPaginationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestPaginationMockMvc.perform(get("/api/test-paginations?eagerload=true"))
        .andExpect(status().isOk());

        verify(testPaginationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTestPaginationsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TestPaginationResource testPaginationResource = new TestPaginationResource(testPaginationRepositoryMock, mockTestPaginationSearchRepository);
            when(testPaginationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTestPaginationMockMvc = MockMvcBuilders.standaloneSetup(testPaginationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestPaginationMockMvc.perform(get("/api/test-paginations?eagerload=true"))
        .andExpect(status().isOk());

            verify(testPaginationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTestPagination() throws Exception {
        // Initialize the database
        testPaginationRepository.saveAndFlush(testPagination);

        // Get the testPagination
        restTestPaginationMockMvc.perform(get("/api/test-paginations/{id}", testPagination.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testPagination.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestPagination() throws Exception {
        // Get the testPagination
        restTestPaginationMockMvc.perform(get("/api/test-paginations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestPagination() throws Exception {
        // Initialize the database
        testPaginationRepository.saveAndFlush(testPagination);

        int databaseSizeBeforeUpdate = testPaginationRepository.findAll().size();

        // Update the testPagination
        TestPagination updatedTestPagination = testPaginationRepository.findById(testPagination.getId()).get();
        // Disconnect from session so that the updates on updatedTestPagination are not directly saved in db
        em.detach(updatedTestPagination);

        restTestPaginationMockMvc.perform(put("/api/test-paginations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestPagination)))
            .andExpect(status().isOk());

        // Validate the TestPagination in the database
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeUpdate);
        TestPagination testTestPagination = testPaginationList.get(testPaginationList.size() - 1);

        // Validate the TestPagination in Elasticsearch
        verify(mockTestPaginationSearchRepository, times(1)).save(testTestPagination);
    }

    @Test
    @Transactional
    public void updateNonExistingTestPagination() throws Exception {
        int databaseSizeBeforeUpdate = testPaginationRepository.findAll().size();

        // Create the TestPagination

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestPaginationMockMvc.perform(put("/api/test-paginations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPagination)))
            .andExpect(status().isBadRequest());

        // Validate the TestPagination in the database
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestPagination in Elasticsearch
        verify(mockTestPaginationSearchRepository, times(0)).save(testPagination);
    }

    @Test
    @Transactional
    public void deleteTestPagination() throws Exception {
        // Initialize the database
        testPaginationRepository.saveAndFlush(testPagination);

        int databaseSizeBeforeDelete = testPaginationRepository.findAll().size();

        // Get the testPagination
        restTestPaginationMockMvc.perform(delete("/api/test-paginations/{id}", testPagination.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestPagination> testPaginationList = testPaginationRepository.findAll();
        assertThat(testPaginationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestPagination in Elasticsearch
        verify(mockTestPaginationSearchRepository, times(1)).deleteById(testPagination.getId());
    }

    @Test
    @Transactional
    public void searchTestPagination() throws Exception {
        // Initialize the database
        testPaginationRepository.saveAndFlush(testPagination);
        when(mockTestPaginationSearchRepository.search(queryStringQuery("id:" + testPagination.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(testPagination), PageRequest.of(0, 1), 1));
        // Search the testPagination
        restTestPaginationMockMvc.perform(get("/api/_search/test-paginations?query=id:" + testPagination.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testPagination.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestPagination.class);
        TestPagination testPagination1 = new TestPagination();
        testPagination1.setId(1L);
        TestPagination testPagination2 = new TestPagination();
        testPagination2.setId(testPagination1.getId());
        assertThat(testPagination1).isEqualTo(testPagination2);
        testPagination2.setId(2L);
        assertThat(testPagination1).isNotEqualTo(testPagination2);
        testPagination1.setId(null);
        assertThat(testPagination1).isNotEqualTo(testPagination2);
    }
}
