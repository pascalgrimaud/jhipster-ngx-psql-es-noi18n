package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestCustomTableName;
import com.mycompany.myapp.domain.TestEntity;
import com.mycompany.myapp.repository.TestCustomTableNameRepository;
import com.mycompany.myapp.repository.search.TestCustomTableNameSearchRepository;
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
 * Test class for the TestCustomTableNameResource REST controller.
 *
 * @see TestCustomTableNameResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestCustomTableNameResourceIntTest {

    @Autowired
    private TestCustomTableNameRepository testCustomTableNameRepository;

    @Mock
    private TestCustomTableNameRepository testCustomTableNameRepositoryMock;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestCustomTableNameSearchRepositoryMockConfiguration
     */
    @Autowired
    private TestCustomTableNameSearchRepository mockTestCustomTableNameSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestCustomTableNameMockMvc;

    private TestCustomTableName testCustomTableName;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestCustomTableNameResource testCustomTableNameResource = new TestCustomTableNameResource(testCustomTableNameRepository, mockTestCustomTableNameSearchRepository);
        this.restTestCustomTableNameMockMvc = MockMvcBuilders.standaloneSetup(testCustomTableNameResource)
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
    public static TestCustomTableName createEntity(EntityManager em) {
        TestCustomTableName testCustomTableName = new TestCustomTableName();
        // Add required entity
        TestEntity testEntity = TestEntityResourceIntTest.createEntity(em);
        em.persist(testEntity);
        em.flush();
        testCustomTableName.setTestEntity(testEntity);
        return testCustomTableName;
    }

    @Before
    public void initTest() {
        testCustomTableName = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestCustomTableName() throws Exception {
        int databaseSizeBeforeCreate = testCustomTableNameRepository.findAll().size();

        // Create the TestCustomTableName
        restTestCustomTableNameMockMvc.perform(post("/api/test-custom-table-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testCustomTableName)))
            .andExpect(status().isCreated());

        // Validate the TestCustomTableName in the database
        List<TestCustomTableName> testCustomTableNameList = testCustomTableNameRepository.findAll();
        assertThat(testCustomTableNameList).hasSize(databaseSizeBeforeCreate + 1);
        TestCustomTableName testTestCustomTableName = testCustomTableNameList.get(testCustomTableNameList.size() - 1);

        // Validate the TestCustomTableName in Elasticsearch
        verify(mockTestCustomTableNameSearchRepository, times(1)).save(testTestCustomTableName);
    }

    @Test
    @Transactional
    public void createTestCustomTableNameWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testCustomTableNameRepository.findAll().size();

        // Create the TestCustomTableName with an existing ID
        testCustomTableName.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestCustomTableNameMockMvc.perform(post("/api/test-custom-table-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testCustomTableName)))
            .andExpect(status().isBadRequest());

        // Validate the TestCustomTableName in the database
        List<TestCustomTableName> testCustomTableNameList = testCustomTableNameRepository.findAll();
        assertThat(testCustomTableNameList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestCustomTableName in Elasticsearch
        verify(mockTestCustomTableNameSearchRepository, times(0)).save(testCustomTableName);
    }

    @Test
    @Transactional
    public void getAllTestCustomTableNames() throws Exception {
        // Initialize the database
        testCustomTableNameRepository.saveAndFlush(testCustomTableName);

        // Get all the testCustomTableNameList
        restTestCustomTableNameMockMvc.perform(get("/api/test-custom-table-names?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testCustomTableName.getId().intValue())));
    }
    
    public void getAllTestCustomTableNamesWithEagerRelationshipsIsEnabled() throws Exception {
        TestCustomTableNameResource testCustomTableNameResource = new TestCustomTableNameResource(testCustomTableNameRepositoryMock, mockTestCustomTableNameSearchRepository);
        when(testCustomTableNameRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTestCustomTableNameMockMvc = MockMvcBuilders.standaloneSetup(testCustomTableNameResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestCustomTableNameMockMvc.perform(get("/api/test-custom-table-names?eagerload=true"))
        .andExpect(status().isOk());

        verify(testCustomTableNameRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTestCustomTableNamesWithEagerRelationshipsIsNotEnabled() throws Exception {
        TestCustomTableNameResource testCustomTableNameResource = new TestCustomTableNameResource(testCustomTableNameRepositoryMock, mockTestCustomTableNameSearchRepository);
            when(testCustomTableNameRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTestCustomTableNameMockMvc = MockMvcBuilders.standaloneSetup(testCustomTableNameResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestCustomTableNameMockMvc.perform(get("/api/test-custom-table-names?eagerload=true"))
        .andExpect(status().isOk());

            verify(testCustomTableNameRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTestCustomTableName() throws Exception {
        // Initialize the database
        testCustomTableNameRepository.saveAndFlush(testCustomTableName);

        // Get the testCustomTableName
        restTestCustomTableNameMockMvc.perform(get("/api/test-custom-table-names/{id}", testCustomTableName.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testCustomTableName.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestCustomTableName() throws Exception {
        // Get the testCustomTableName
        restTestCustomTableNameMockMvc.perform(get("/api/test-custom-table-names/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestCustomTableName() throws Exception {
        // Initialize the database
        testCustomTableNameRepository.saveAndFlush(testCustomTableName);

        int databaseSizeBeforeUpdate = testCustomTableNameRepository.findAll().size();

        // Update the testCustomTableName
        TestCustomTableName updatedTestCustomTableName = testCustomTableNameRepository.findById(testCustomTableName.getId()).get();
        // Disconnect from session so that the updates on updatedTestCustomTableName are not directly saved in db
        em.detach(updatedTestCustomTableName);

        restTestCustomTableNameMockMvc.perform(put("/api/test-custom-table-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestCustomTableName)))
            .andExpect(status().isOk());

        // Validate the TestCustomTableName in the database
        List<TestCustomTableName> testCustomTableNameList = testCustomTableNameRepository.findAll();
        assertThat(testCustomTableNameList).hasSize(databaseSizeBeforeUpdate);
        TestCustomTableName testTestCustomTableName = testCustomTableNameList.get(testCustomTableNameList.size() - 1);

        // Validate the TestCustomTableName in Elasticsearch
        verify(mockTestCustomTableNameSearchRepository, times(1)).save(testTestCustomTableName);
    }

    @Test
    @Transactional
    public void updateNonExistingTestCustomTableName() throws Exception {
        int databaseSizeBeforeUpdate = testCustomTableNameRepository.findAll().size();

        // Create the TestCustomTableName

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestCustomTableNameMockMvc.perform(put("/api/test-custom-table-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testCustomTableName)))
            .andExpect(status().isBadRequest());

        // Validate the TestCustomTableName in the database
        List<TestCustomTableName> testCustomTableNameList = testCustomTableNameRepository.findAll();
        assertThat(testCustomTableNameList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestCustomTableName in Elasticsearch
        verify(mockTestCustomTableNameSearchRepository, times(0)).save(testCustomTableName);
    }

    @Test
    @Transactional
    public void deleteTestCustomTableName() throws Exception {
        // Initialize the database
        testCustomTableNameRepository.saveAndFlush(testCustomTableName);

        int databaseSizeBeforeDelete = testCustomTableNameRepository.findAll().size();

        // Get the testCustomTableName
        restTestCustomTableNameMockMvc.perform(delete("/api/test-custom-table-names/{id}", testCustomTableName.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestCustomTableName> testCustomTableNameList = testCustomTableNameRepository.findAll();
        assertThat(testCustomTableNameList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestCustomTableName in Elasticsearch
        verify(mockTestCustomTableNameSearchRepository, times(1)).deleteById(testCustomTableName.getId());
    }

    @Test
    @Transactional
    public void searchTestCustomTableName() throws Exception {
        // Initialize the database
        testCustomTableNameRepository.saveAndFlush(testCustomTableName);
        when(mockTestCustomTableNameSearchRepository.search(queryStringQuery("id:" + testCustomTableName.getId())))
            .thenReturn(Collections.singletonList(testCustomTableName));
        // Search the testCustomTableName
        restTestCustomTableNameMockMvc.perform(get("/api/_search/test-custom-table-names?query=id:" + testCustomTableName.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testCustomTableName.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestCustomTableName.class);
        TestCustomTableName testCustomTableName1 = new TestCustomTableName();
        testCustomTableName1.setId(1L);
        TestCustomTableName testCustomTableName2 = new TestCustomTableName();
        testCustomTableName2.setId(testCustomTableName1.getId());
        assertThat(testCustomTableName1).isEqualTo(testCustomTableName2);
        testCustomTableName2.setId(2L);
        assertThat(testCustomTableName1).isNotEqualTo(testCustomTableName2);
        testCustomTableName1.setId(null);
        assertThat(testCustomTableName1).isNotEqualTo(testCustomTableName2);
    }
}
