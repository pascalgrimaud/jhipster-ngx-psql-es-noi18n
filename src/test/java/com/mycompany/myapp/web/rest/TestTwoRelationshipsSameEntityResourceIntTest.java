package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestTwoRelationshipsSameEntity;
import com.mycompany.myapp.domain.Division;
import com.mycompany.myapp.domain.Division;
import com.mycompany.myapp.repository.TestTwoRelationshipsSameEntityRepository;
import com.mycompany.myapp.repository.search.TestTwoRelationshipsSameEntitySearchRepository;
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
 * Test class for the TestTwoRelationshipsSameEntityResource REST controller.
 *
 * @see TestTwoRelationshipsSameEntityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestTwoRelationshipsSameEntityResourceIntTest {

    @Autowired
    private TestTwoRelationshipsSameEntityRepository testTwoRelationshipsSameEntityRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestTwoRelationshipsSameEntitySearchRepositoryMockConfiguration
     */
    @Autowired
    private TestTwoRelationshipsSameEntitySearchRepository mockTestTwoRelationshipsSameEntitySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestTwoRelationshipsSameEntityMockMvc;

    private TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestTwoRelationshipsSameEntityResource testTwoRelationshipsSameEntityResource = new TestTwoRelationshipsSameEntityResource(testTwoRelationshipsSameEntityRepository, mockTestTwoRelationshipsSameEntitySearchRepository);
        this.restTestTwoRelationshipsSameEntityMockMvc = MockMvcBuilders.standaloneSetup(testTwoRelationshipsSameEntityResource)
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
    public static TestTwoRelationshipsSameEntity createEntity(EntityManager em) {
        TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity = new TestTwoRelationshipsSameEntity();
        // Add required entity
        Division division = DivisionResourceIntTest.createEntity(em);
        em.persist(division);
        em.flush();
        testTwoRelationshipsSameEntity.setFirstUniqueRequiredRelation(division);
        // Add required entity
        testTwoRelationshipsSameEntity.setSecondUniqueRequiredRelation(division);
        return testTwoRelationshipsSameEntity;
    }

    @Before
    public void initTest() {
        testTwoRelationshipsSameEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestTwoRelationshipsSameEntity() throws Exception {
        int databaseSizeBeforeCreate = testTwoRelationshipsSameEntityRepository.findAll().size();

        // Create the TestTwoRelationshipsSameEntity
        restTestTwoRelationshipsSameEntityMockMvc.perform(post("/api/test-two-relationships-same-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testTwoRelationshipsSameEntity)))
            .andExpect(status().isCreated());

        // Validate the TestTwoRelationshipsSameEntity in the database
        List<TestTwoRelationshipsSameEntity> testTwoRelationshipsSameEntityList = testTwoRelationshipsSameEntityRepository.findAll();
        assertThat(testTwoRelationshipsSameEntityList).hasSize(databaseSizeBeforeCreate + 1);
        TestTwoRelationshipsSameEntity testTestTwoRelationshipsSameEntity = testTwoRelationshipsSameEntityList.get(testTwoRelationshipsSameEntityList.size() - 1);

        // Validate the TestTwoRelationshipsSameEntity in Elasticsearch
        verify(mockTestTwoRelationshipsSameEntitySearchRepository, times(1)).save(testTestTwoRelationshipsSameEntity);
    }

    @Test
    @Transactional
    public void createTestTwoRelationshipsSameEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testTwoRelationshipsSameEntityRepository.findAll().size();

        // Create the TestTwoRelationshipsSameEntity with an existing ID
        testTwoRelationshipsSameEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestTwoRelationshipsSameEntityMockMvc.perform(post("/api/test-two-relationships-same-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testTwoRelationshipsSameEntity)))
            .andExpect(status().isBadRequest());

        // Validate the TestTwoRelationshipsSameEntity in the database
        List<TestTwoRelationshipsSameEntity> testTwoRelationshipsSameEntityList = testTwoRelationshipsSameEntityRepository.findAll();
        assertThat(testTwoRelationshipsSameEntityList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestTwoRelationshipsSameEntity in Elasticsearch
        verify(mockTestTwoRelationshipsSameEntitySearchRepository, times(0)).save(testTwoRelationshipsSameEntity);
    }

    @Test
    @Transactional
    public void getAllTestTwoRelationshipsSameEntities() throws Exception {
        // Initialize the database
        testTwoRelationshipsSameEntityRepository.saveAndFlush(testTwoRelationshipsSameEntity);

        // Get all the testTwoRelationshipsSameEntityList
        restTestTwoRelationshipsSameEntityMockMvc.perform(get("/api/test-two-relationships-same-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testTwoRelationshipsSameEntity.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getTestTwoRelationshipsSameEntity() throws Exception {
        // Initialize the database
        testTwoRelationshipsSameEntityRepository.saveAndFlush(testTwoRelationshipsSameEntity);

        // Get the testTwoRelationshipsSameEntity
        restTestTwoRelationshipsSameEntityMockMvc.perform(get("/api/test-two-relationships-same-entities/{id}", testTwoRelationshipsSameEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testTwoRelationshipsSameEntity.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestTwoRelationshipsSameEntity() throws Exception {
        // Get the testTwoRelationshipsSameEntity
        restTestTwoRelationshipsSameEntityMockMvc.perform(get("/api/test-two-relationships-same-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestTwoRelationshipsSameEntity() throws Exception {
        // Initialize the database
        testTwoRelationshipsSameEntityRepository.saveAndFlush(testTwoRelationshipsSameEntity);

        int databaseSizeBeforeUpdate = testTwoRelationshipsSameEntityRepository.findAll().size();

        // Update the testTwoRelationshipsSameEntity
        TestTwoRelationshipsSameEntity updatedTestTwoRelationshipsSameEntity = testTwoRelationshipsSameEntityRepository.findById(testTwoRelationshipsSameEntity.getId()).get();
        // Disconnect from session so that the updates on updatedTestTwoRelationshipsSameEntity are not directly saved in db
        em.detach(updatedTestTwoRelationshipsSameEntity);

        restTestTwoRelationshipsSameEntityMockMvc.perform(put("/api/test-two-relationships-same-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestTwoRelationshipsSameEntity)))
            .andExpect(status().isOk());

        // Validate the TestTwoRelationshipsSameEntity in the database
        List<TestTwoRelationshipsSameEntity> testTwoRelationshipsSameEntityList = testTwoRelationshipsSameEntityRepository.findAll();
        assertThat(testTwoRelationshipsSameEntityList).hasSize(databaseSizeBeforeUpdate);
        TestTwoRelationshipsSameEntity testTestTwoRelationshipsSameEntity = testTwoRelationshipsSameEntityList.get(testTwoRelationshipsSameEntityList.size() - 1);

        // Validate the TestTwoRelationshipsSameEntity in Elasticsearch
        verify(mockTestTwoRelationshipsSameEntitySearchRepository, times(1)).save(testTestTwoRelationshipsSameEntity);
    }

    @Test
    @Transactional
    public void updateNonExistingTestTwoRelationshipsSameEntity() throws Exception {
        int databaseSizeBeforeUpdate = testTwoRelationshipsSameEntityRepository.findAll().size();

        // Create the TestTwoRelationshipsSameEntity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestTwoRelationshipsSameEntityMockMvc.perform(put("/api/test-two-relationships-same-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testTwoRelationshipsSameEntity)))
            .andExpect(status().isBadRequest());

        // Validate the TestTwoRelationshipsSameEntity in the database
        List<TestTwoRelationshipsSameEntity> testTwoRelationshipsSameEntityList = testTwoRelationshipsSameEntityRepository.findAll();
        assertThat(testTwoRelationshipsSameEntityList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestTwoRelationshipsSameEntity in Elasticsearch
        verify(mockTestTwoRelationshipsSameEntitySearchRepository, times(0)).save(testTwoRelationshipsSameEntity);
    }

    @Test
    @Transactional
    public void deleteTestTwoRelationshipsSameEntity() throws Exception {
        // Initialize the database
        testTwoRelationshipsSameEntityRepository.saveAndFlush(testTwoRelationshipsSameEntity);

        int databaseSizeBeforeDelete = testTwoRelationshipsSameEntityRepository.findAll().size();

        // Get the testTwoRelationshipsSameEntity
        restTestTwoRelationshipsSameEntityMockMvc.perform(delete("/api/test-two-relationships-same-entities/{id}", testTwoRelationshipsSameEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestTwoRelationshipsSameEntity> testTwoRelationshipsSameEntityList = testTwoRelationshipsSameEntityRepository.findAll();
        assertThat(testTwoRelationshipsSameEntityList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestTwoRelationshipsSameEntity in Elasticsearch
        verify(mockTestTwoRelationshipsSameEntitySearchRepository, times(1)).deleteById(testTwoRelationshipsSameEntity.getId());
    }

    @Test
    @Transactional
    public void searchTestTwoRelationshipsSameEntity() throws Exception {
        // Initialize the database
        testTwoRelationshipsSameEntityRepository.saveAndFlush(testTwoRelationshipsSameEntity);
        when(mockTestTwoRelationshipsSameEntitySearchRepository.search(queryStringQuery("id:" + testTwoRelationshipsSameEntity.getId())))
            .thenReturn(Collections.singletonList(testTwoRelationshipsSameEntity));
        // Search the testTwoRelationshipsSameEntity
        restTestTwoRelationshipsSameEntityMockMvc.perform(get("/api/_search/test-two-relationships-same-entities?query=id:" + testTwoRelationshipsSameEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testTwoRelationshipsSameEntity.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestTwoRelationshipsSameEntity.class);
        TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity1 = new TestTwoRelationshipsSameEntity();
        testTwoRelationshipsSameEntity1.setId(1L);
        TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity2 = new TestTwoRelationshipsSameEntity();
        testTwoRelationshipsSameEntity2.setId(testTwoRelationshipsSameEntity1.getId());
        assertThat(testTwoRelationshipsSameEntity1).isEqualTo(testTwoRelationshipsSameEntity2);
        testTwoRelationshipsSameEntity2.setId(2L);
        assertThat(testTwoRelationshipsSameEntity1).isNotEqualTo(testTwoRelationshipsSameEntity2);
        testTwoRelationshipsSameEntity1.setId(null);
        assertThat(testTwoRelationshipsSameEntity1).isNotEqualTo(testTwoRelationshipsSameEntity2);
    }
}
