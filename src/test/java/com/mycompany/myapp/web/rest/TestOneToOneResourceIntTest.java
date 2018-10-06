package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestOneToOne;
import com.mycompany.myapp.repository.TestOneToOneRepository;
import com.mycompany.myapp.repository.search.TestOneToOneSearchRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
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
 * Test class for the TestOneToOneResource REST controller.
 *
 * @see TestOneToOneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestOneToOneResourceIntTest {

    @Autowired
    private TestOneToOneRepository testOneToOneRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestOneToOneSearchRepositoryMockConfiguration
     */
    @Autowired
    private TestOneToOneSearchRepository mockTestOneToOneSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestOneToOneMockMvc;

    private TestOneToOne testOneToOne;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestOneToOneResource testOneToOneResource = new TestOneToOneResource(testOneToOneRepository, mockTestOneToOneSearchRepository);
        this.restTestOneToOneMockMvc = MockMvcBuilders.standaloneSetup(testOneToOneResource)
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
    public static TestOneToOne createEntity(EntityManager em) {
        TestOneToOne testOneToOne = new TestOneToOne();
        return testOneToOne;
    }

    @Before
    public void initTest() {
        testOneToOne = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestOneToOne() throws Exception {
        int databaseSizeBeforeCreate = testOneToOneRepository.findAll().size();

        // Create the TestOneToOne
        restTestOneToOneMockMvc.perform(post("/api/test-one-to-ones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testOneToOne)))
            .andExpect(status().isCreated());

        // Validate the TestOneToOne in the database
        List<TestOneToOne> testOneToOneList = testOneToOneRepository.findAll();
        assertThat(testOneToOneList).hasSize(databaseSizeBeforeCreate + 1);
        TestOneToOne testTestOneToOne = testOneToOneList.get(testOneToOneList.size() - 1);

        // Validate the TestOneToOne in Elasticsearch
        verify(mockTestOneToOneSearchRepository, times(1)).save(testTestOneToOne);
    }

    @Test
    @Transactional
    public void createTestOneToOneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testOneToOneRepository.findAll().size();

        // Create the TestOneToOne with an existing ID
        testOneToOne.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestOneToOneMockMvc.perform(post("/api/test-one-to-ones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testOneToOne)))
            .andExpect(status().isBadRequest());

        // Validate the TestOneToOne in the database
        List<TestOneToOne> testOneToOneList = testOneToOneRepository.findAll();
        assertThat(testOneToOneList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestOneToOne in Elasticsearch
        verify(mockTestOneToOneSearchRepository, times(0)).save(testOneToOne);
    }

    @Test
    @Transactional
    public void getAllTestOneToOnes() throws Exception {
        // Initialize the database
        testOneToOneRepository.saveAndFlush(testOneToOne);

        // Get all the testOneToOneList
        restTestOneToOneMockMvc.perform(get("/api/test-one-to-ones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testOneToOne.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getTestOneToOne() throws Exception {
        // Initialize the database
        testOneToOneRepository.saveAndFlush(testOneToOne);

        // Get the testOneToOne
        restTestOneToOneMockMvc.perform(get("/api/test-one-to-ones/{id}", testOneToOne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testOneToOne.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestOneToOne() throws Exception {
        // Get the testOneToOne
        restTestOneToOneMockMvc.perform(get("/api/test-one-to-ones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestOneToOne() throws Exception {
        // Initialize the database
        testOneToOneRepository.saveAndFlush(testOneToOne);

        int databaseSizeBeforeUpdate = testOneToOneRepository.findAll().size();

        // Update the testOneToOne
        TestOneToOne updatedTestOneToOne = testOneToOneRepository.findById(testOneToOne.getId()).get();
        // Disconnect from session so that the updates on updatedTestOneToOne are not directly saved in db
        em.detach(updatedTestOneToOne);

        restTestOneToOneMockMvc.perform(put("/api/test-one-to-ones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestOneToOne)))
            .andExpect(status().isOk());

        // Validate the TestOneToOne in the database
        List<TestOneToOne> testOneToOneList = testOneToOneRepository.findAll();
        assertThat(testOneToOneList).hasSize(databaseSizeBeforeUpdate);
        TestOneToOne testTestOneToOne = testOneToOneList.get(testOneToOneList.size() - 1);

        // Validate the TestOneToOne in Elasticsearch
        verify(mockTestOneToOneSearchRepository, times(1)).save(testTestOneToOne);
    }

    @Test
    @Transactional
    public void updateNonExistingTestOneToOne() throws Exception {
        int databaseSizeBeforeUpdate = testOneToOneRepository.findAll().size();

        // Create the TestOneToOne

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestOneToOneMockMvc.perform(put("/api/test-one-to-ones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testOneToOne)))
            .andExpect(status().isBadRequest());

        // Validate the TestOneToOne in the database
        List<TestOneToOne> testOneToOneList = testOneToOneRepository.findAll();
        assertThat(testOneToOneList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestOneToOne in Elasticsearch
        verify(mockTestOneToOneSearchRepository, times(0)).save(testOneToOne);
    }

    @Test
    @Transactional
    public void deleteTestOneToOne() throws Exception {
        // Initialize the database
        testOneToOneRepository.saveAndFlush(testOneToOne);

        int databaseSizeBeforeDelete = testOneToOneRepository.findAll().size();

        // Get the testOneToOne
        restTestOneToOneMockMvc.perform(delete("/api/test-one-to-ones/{id}", testOneToOne.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestOneToOne> testOneToOneList = testOneToOneRepository.findAll();
        assertThat(testOneToOneList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestOneToOne in Elasticsearch
        verify(mockTestOneToOneSearchRepository, times(1)).deleteById(testOneToOne.getId());
    }

    @Test
    @Transactional
    public void searchTestOneToOne() throws Exception {
        // Initialize the database
        testOneToOneRepository.saveAndFlush(testOneToOne);
        when(mockTestOneToOneSearchRepository.search(queryStringQuery("id:" + testOneToOne.getId())))
            .thenReturn(Collections.singletonList(testOneToOne));
        // Search the testOneToOne
        restTestOneToOneMockMvc.perform(get("/api/_search/test-one-to-ones?query=id:" + testOneToOne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testOneToOne.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestOneToOne.class);
        TestOneToOne testOneToOne1 = new TestOneToOne();
        testOneToOne1.setId(1L);
        TestOneToOne testOneToOne2 = new TestOneToOne();
        testOneToOne2.setId(testOneToOne1.getId());
        assertThat(testOneToOne1).isEqualTo(testOneToOne2);
        testOneToOne2.setId(2L);
        assertThat(testOneToOne1).isNotEqualTo(testOneToOne2);
        testOneToOne1.setId(null);
        assertThat(testOneToOne1).isNotEqualTo(testOneToOne2);
    }
}
