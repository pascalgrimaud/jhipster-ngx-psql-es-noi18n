package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestPager;
import com.mycompany.myapp.repository.TestPagerRepository;
import com.mycompany.myapp.repository.search.TestPagerSearchRepository;
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
 * Test class for the TestPagerResource REST controller.
 *
 * @see TestPagerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestPagerResourceIntTest {

    @Autowired
    private TestPagerRepository testPagerRepository;

    @Mock
    private TestPagerRepository testPagerRepositoryMock;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestPagerSearchRepositoryMockConfiguration
     */
    @Autowired
    private TestPagerSearchRepository mockTestPagerSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestPagerMockMvc;

    private TestPager testPager;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestPagerResource testPagerResource = new TestPagerResource(testPagerRepository, mockTestPagerSearchRepository);
        this.restTestPagerMockMvc = MockMvcBuilders.standaloneSetup(testPagerResource)
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
    public static TestPager createEntity(EntityManager em) {
        TestPager testPager = new TestPager();
        return testPager;
    }

    @Before
    public void initTest() {
        testPager = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestPager() throws Exception {
        int databaseSizeBeforeCreate = testPagerRepository.findAll().size();

        // Create the TestPager
        restTestPagerMockMvc.perform(post("/api/test-pagers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPager)))
            .andExpect(status().isCreated());

        // Validate the TestPager in the database
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeCreate + 1);
        TestPager testTestPager = testPagerList.get(testPagerList.size() - 1);

        // Validate the TestPager in Elasticsearch
        verify(mockTestPagerSearchRepository, times(1)).save(testTestPager);
    }

    @Test
    @Transactional
    public void createTestPagerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testPagerRepository.findAll().size();

        // Create the TestPager with an existing ID
        testPager.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestPagerMockMvc.perform(post("/api/test-pagers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPager)))
            .andExpect(status().isBadRequest());

        // Validate the TestPager in the database
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestPager in Elasticsearch
        verify(mockTestPagerSearchRepository, times(0)).save(testPager);
    }

    @Test
    @Transactional
    public void getAllTestPagers() throws Exception {
        // Initialize the database
        testPagerRepository.saveAndFlush(testPager);

        // Get all the testPagerList
        restTestPagerMockMvc.perform(get("/api/test-pagers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testPager.getId().intValue())));
    }
    
    public void getAllTestPagersWithEagerRelationshipsIsEnabled() throws Exception {
        TestPagerResource testPagerResource = new TestPagerResource(testPagerRepositoryMock, mockTestPagerSearchRepository);
        when(testPagerRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTestPagerMockMvc = MockMvcBuilders.standaloneSetup(testPagerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestPagerMockMvc.perform(get("/api/test-pagers?eagerload=true"))
        .andExpect(status().isOk());

        verify(testPagerRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTestPagersWithEagerRelationshipsIsNotEnabled() throws Exception {
        TestPagerResource testPagerResource = new TestPagerResource(testPagerRepositoryMock, mockTestPagerSearchRepository);
            when(testPagerRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTestPagerMockMvc = MockMvcBuilders.standaloneSetup(testPagerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestPagerMockMvc.perform(get("/api/test-pagers?eagerload=true"))
        .andExpect(status().isOk());

            verify(testPagerRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTestPager() throws Exception {
        // Initialize the database
        testPagerRepository.saveAndFlush(testPager);

        // Get the testPager
        restTestPagerMockMvc.perform(get("/api/test-pagers/{id}", testPager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testPager.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestPager() throws Exception {
        // Get the testPager
        restTestPagerMockMvc.perform(get("/api/test-pagers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestPager() throws Exception {
        // Initialize the database
        testPagerRepository.saveAndFlush(testPager);

        int databaseSizeBeforeUpdate = testPagerRepository.findAll().size();

        // Update the testPager
        TestPager updatedTestPager = testPagerRepository.findById(testPager.getId()).get();
        // Disconnect from session so that the updates on updatedTestPager are not directly saved in db
        em.detach(updatedTestPager);

        restTestPagerMockMvc.perform(put("/api/test-pagers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestPager)))
            .andExpect(status().isOk());

        // Validate the TestPager in the database
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeUpdate);
        TestPager testTestPager = testPagerList.get(testPagerList.size() - 1);

        // Validate the TestPager in Elasticsearch
        verify(mockTestPagerSearchRepository, times(1)).save(testTestPager);
    }

    @Test
    @Transactional
    public void updateNonExistingTestPager() throws Exception {
        int databaseSizeBeforeUpdate = testPagerRepository.findAll().size();

        // Create the TestPager

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestPagerMockMvc.perform(put("/api/test-pagers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPager)))
            .andExpect(status().isBadRequest());

        // Validate the TestPager in the database
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestPager in Elasticsearch
        verify(mockTestPagerSearchRepository, times(0)).save(testPager);
    }

    @Test
    @Transactional
    public void deleteTestPager() throws Exception {
        // Initialize the database
        testPagerRepository.saveAndFlush(testPager);

        int databaseSizeBeforeDelete = testPagerRepository.findAll().size();

        // Get the testPager
        restTestPagerMockMvc.perform(delete("/api/test-pagers/{id}", testPager.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestPager> testPagerList = testPagerRepository.findAll();
        assertThat(testPagerList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestPager in Elasticsearch
        verify(mockTestPagerSearchRepository, times(1)).deleteById(testPager.getId());
    }

    @Test
    @Transactional
    public void searchTestPager() throws Exception {
        // Initialize the database
        testPagerRepository.saveAndFlush(testPager);
        when(mockTestPagerSearchRepository.search(queryStringQuery("id:" + testPager.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(testPager), PageRequest.of(0, 1), 1));
        // Search the testPager
        restTestPagerMockMvc.perform(get("/api/_search/test-pagers?query=id:" + testPager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testPager.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestPager.class);
        TestPager testPager1 = new TestPager();
        testPager1.setId(1L);
        TestPager testPager2 = new TestPager();
        testPager2.setId(testPager1.getId());
        assertThat(testPager1).isEqualTo(testPager2);
        testPager2.setId(2L);
        assertThat(testPager1).isNotEqualTo(testPager2);
        testPager1.setId(null);
        assertThat(testPager1).isNotEqualTo(testPager2);
    }
}
