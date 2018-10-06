package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestInfiniteScroll;
import com.mycompany.myapp.repository.TestInfiniteScrollRepository;
import com.mycompany.myapp.repository.search.TestInfiniteScrollSearchRepository;
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
 * Test class for the TestInfiniteScrollResource REST controller.
 *
 * @see TestInfiniteScrollResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestInfiniteScrollResourceIntTest {

    @Autowired
    private TestInfiniteScrollRepository testInfiniteScrollRepository;

    @Mock
    private TestInfiniteScrollRepository testInfiniteScrollRepositoryMock;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestInfiniteScrollSearchRepositoryMockConfiguration
     */
    @Autowired
    private TestInfiniteScrollSearchRepository mockTestInfiniteScrollSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestInfiniteScrollMockMvc;

    private TestInfiniteScroll testInfiniteScroll;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestInfiniteScrollResource testInfiniteScrollResource = new TestInfiniteScrollResource(testInfiniteScrollRepository, mockTestInfiniteScrollSearchRepository);
        this.restTestInfiniteScrollMockMvc = MockMvcBuilders.standaloneSetup(testInfiniteScrollResource)
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
    public static TestInfiniteScroll createEntity(EntityManager em) {
        TestInfiniteScroll testInfiniteScroll = new TestInfiniteScroll();
        return testInfiniteScroll;
    }

    @Before
    public void initTest() {
        testInfiniteScroll = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestInfiniteScroll() throws Exception {
        int databaseSizeBeforeCreate = testInfiniteScrollRepository.findAll().size();

        // Create the TestInfiniteScroll
        restTestInfiniteScrollMockMvc.perform(post("/api/test-infinite-scrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testInfiniteScroll)))
            .andExpect(status().isCreated());

        // Validate the TestInfiniteScroll in the database
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeCreate + 1);
        TestInfiniteScroll testTestInfiniteScroll = testInfiniteScrollList.get(testInfiniteScrollList.size() - 1);

        // Validate the TestInfiniteScroll in Elasticsearch
        verify(mockTestInfiniteScrollSearchRepository, times(1)).save(testTestInfiniteScroll);
    }

    @Test
    @Transactional
    public void createTestInfiniteScrollWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testInfiniteScrollRepository.findAll().size();

        // Create the TestInfiniteScroll with an existing ID
        testInfiniteScroll.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestInfiniteScrollMockMvc.perform(post("/api/test-infinite-scrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testInfiniteScroll)))
            .andExpect(status().isBadRequest());

        // Validate the TestInfiniteScroll in the database
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestInfiniteScroll in Elasticsearch
        verify(mockTestInfiniteScrollSearchRepository, times(0)).save(testInfiniteScroll);
    }

    @Test
    @Transactional
    public void getAllTestInfiniteScrolls() throws Exception {
        // Initialize the database
        testInfiniteScrollRepository.saveAndFlush(testInfiniteScroll);

        // Get all the testInfiniteScrollList
        restTestInfiniteScrollMockMvc.perform(get("/api/test-infinite-scrolls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testInfiniteScroll.getId().intValue())));
    }
    
    public void getAllTestInfiniteScrollsWithEagerRelationshipsIsEnabled() throws Exception {
        TestInfiniteScrollResource testInfiniteScrollResource = new TestInfiniteScrollResource(testInfiniteScrollRepositoryMock, mockTestInfiniteScrollSearchRepository);
        when(testInfiniteScrollRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTestInfiniteScrollMockMvc = MockMvcBuilders.standaloneSetup(testInfiniteScrollResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestInfiniteScrollMockMvc.perform(get("/api/test-infinite-scrolls?eagerload=true"))
        .andExpect(status().isOk());

        verify(testInfiniteScrollRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTestInfiniteScrollsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TestInfiniteScrollResource testInfiniteScrollResource = new TestInfiniteScrollResource(testInfiniteScrollRepositoryMock, mockTestInfiniteScrollSearchRepository);
            when(testInfiniteScrollRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTestInfiniteScrollMockMvc = MockMvcBuilders.standaloneSetup(testInfiniteScrollResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestInfiniteScrollMockMvc.perform(get("/api/test-infinite-scrolls?eagerload=true"))
        .andExpect(status().isOk());

            verify(testInfiniteScrollRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTestInfiniteScroll() throws Exception {
        // Initialize the database
        testInfiniteScrollRepository.saveAndFlush(testInfiniteScroll);

        // Get the testInfiniteScroll
        restTestInfiniteScrollMockMvc.perform(get("/api/test-infinite-scrolls/{id}", testInfiniteScroll.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testInfiniteScroll.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestInfiniteScroll() throws Exception {
        // Get the testInfiniteScroll
        restTestInfiniteScrollMockMvc.perform(get("/api/test-infinite-scrolls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestInfiniteScroll() throws Exception {
        // Initialize the database
        testInfiniteScrollRepository.saveAndFlush(testInfiniteScroll);

        int databaseSizeBeforeUpdate = testInfiniteScrollRepository.findAll().size();

        // Update the testInfiniteScroll
        TestInfiniteScroll updatedTestInfiniteScroll = testInfiniteScrollRepository.findById(testInfiniteScroll.getId()).get();
        // Disconnect from session so that the updates on updatedTestInfiniteScroll are not directly saved in db
        em.detach(updatedTestInfiniteScroll);

        restTestInfiniteScrollMockMvc.perform(put("/api/test-infinite-scrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestInfiniteScroll)))
            .andExpect(status().isOk());

        // Validate the TestInfiniteScroll in the database
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeUpdate);
        TestInfiniteScroll testTestInfiniteScroll = testInfiniteScrollList.get(testInfiniteScrollList.size() - 1);

        // Validate the TestInfiniteScroll in Elasticsearch
        verify(mockTestInfiniteScrollSearchRepository, times(1)).save(testTestInfiniteScroll);
    }

    @Test
    @Transactional
    public void updateNonExistingTestInfiniteScroll() throws Exception {
        int databaseSizeBeforeUpdate = testInfiniteScrollRepository.findAll().size();

        // Create the TestInfiniteScroll

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestInfiniteScrollMockMvc.perform(put("/api/test-infinite-scrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testInfiniteScroll)))
            .andExpect(status().isBadRequest());

        // Validate the TestInfiniteScroll in the database
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestInfiniteScroll in Elasticsearch
        verify(mockTestInfiniteScrollSearchRepository, times(0)).save(testInfiniteScroll);
    }

    @Test
    @Transactional
    public void deleteTestInfiniteScroll() throws Exception {
        // Initialize the database
        testInfiniteScrollRepository.saveAndFlush(testInfiniteScroll);

        int databaseSizeBeforeDelete = testInfiniteScrollRepository.findAll().size();

        // Get the testInfiniteScroll
        restTestInfiniteScrollMockMvc.perform(delete("/api/test-infinite-scrolls/{id}", testInfiniteScroll.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestInfiniteScroll> testInfiniteScrollList = testInfiniteScrollRepository.findAll();
        assertThat(testInfiniteScrollList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestInfiniteScroll in Elasticsearch
        verify(mockTestInfiniteScrollSearchRepository, times(1)).deleteById(testInfiniteScroll.getId());
    }

    @Test
    @Transactional
    public void searchTestInfiniteScroll() throws Exception {
        // Initialize the database
        testInfiniteScrollRepository.saveAndFlush(testInfiniteScroll);
        when(mockTestInfiniteScrollSearchRepository.search(queryStringQuery("id:" + testInfiniteScroll.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(testInfiniteScroll), PageRequest.of(0, 1), 1));
        // Search the testInfiniteScroll
        restTestInfiniteScrollMockMvc.perform(get("/api/_search/test-infinite-scrolls?query=id:" + testInfiniteScroll.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testInfiniteScroll.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestInfiniteScroll.class);
        TestInfiniteScroll testInfiniteScroll1 = new TestInfiniteScroll();
        testInfiniteScroll1.setId(1L);
        TestInfiniteScroll testInfiniteScroll2 = new TestInfiniteScroll();
        testInfiniteScroll2.setId(testInfiniteScroll1.getId());
        assertThat(testInfiniteScroll1).isEqualTo(testInfiniteScroll2);
        testInfiniteScroll2.setId(2L);
        assertThat(testInfiniteScroll1).isNotEqualTo(testInfiniteScroll2);
        testInfiniteScroll1.setId(null);
        assertThat(testInfiniteScroll1).isNotEqualTo(testInfiniteScroll2);
    }
}
