package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestMapstruct;
import com.mycompany.myapp.repository.TestMapstructRepository;
import com.mycompany.myapp.repository.search.TestMapstructSearchRepository;
import com.mycompany.myapp.service.dto.TestMapstructDTO;
import com.mycompany.myapp.service.mapper.TestMapstructMapper;
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
 * Test class for the TestMapstructResource REST controller.
 *
 * @see TestMapstructResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestMapstructResourceIntTest {

    @Autowired
    private TestMapstructRepository testMapstructRepository;

    @Mock
    private TestMapstructRepository testMapstructRepositoryMock;

    @Autowired
    private TestMapstructMapper testMapstructMapper;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestMapstructSearchRepositoryMockConfiguration
     */
    @Autowired
    private TestMapstructSearchRepository mockTestMapstructSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestMapstructMockMvc;

    private TestMapstruct testMapstruct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestMapstructResource testMapstructResource = new TestMapstructResource(testMapstructRepository, testMapstructMapper, mockTestMapstructSearchRepository);
        this.restTestMapstructMockMvc = MockMvcBuilders.standaloneSetup(testMapstructResource)
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
    public static TestMapstruct createEntity(EntityManager em) {
        TestMapstruct testMapstruct = new TestMapstruct();
        return testMapstruct;
    }

    @Before
    public void initTest() {
        testMapstruct = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestMapstruct() throws Exception {
        int databaseSizeBeforeCreate = testMapstructRepository.findAll().size();

        // Create the TestMapstruct
        TestMapstructDTO testMapstructDTO = testMapstructMapper.toDto(testMapstruct);
        restTestMapstructMockMvc.perform(post("/api/test-mapstructs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMapstructDTO)))
            .andExpect(status().isCreated());

        // Validate the TestMapstruct in the database
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeCreate + 1);
        TestMapstruct testTestMapstruct = testMapstructList.get(testMapstructList.size() - 1);

        // Validate the TestMapstruct in Elasticsearch
        verify(mockTestMapstructSearchRepository, times(1)).save(testTestMapstruct);
    }

    @Test
    @Transactional
    public void createTestMapstructWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testMapstructRepository.findAll().size();

        // Create the TestMapstruct with an existing ID
        testMapstruct.setId(1L);
        TestMapstructDTO testMapstructDTO = testMapstructMapper.toDto(testMapstruct);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestMapstructMockMvc.perform(post("/api/test-mapstructs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMapstructDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TestMapstruct in the database
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestMapstruct in Elasticsearch
        verify(mockTestMapstructSearchRepository, times(0)).save(testMapstruct);
    }

    @Test
    @Transactional
    public void getAllTestMapstructs() throws Exception {
        // Initialize the database
        testMapstructRepository.saveAndFlush(testMapstruct);

        // Get all the testMapstructList
        restTestMapstructMockMvc.perform(get("/api/test-mapstructs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testMapstruct.getId().intValue())));
    }
    
    public void getAllTestMapstructsWithEagerRelationshipsIsEnabled() throws Exception {
        TestMapstructResource testMapstructResource = new TestMapstructResource(testMapstructRepositoryMock, testMapstructMapper, mockTestMapstructSearchRepository);
        when(testMapstructRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTestMapstructMockMvc = MockMvcBuilders.standaloneSetup(testMapstructResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestMapstructMockMvc.perform(get("/api/test-mapstructs?eagerload=true"))
        .andExpect(status().isOk());

        verify(testMapstructRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTestMapstructsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TestMapstructResource testMapstructResource = new TestMapstructResource(testMapstructRepositoryMock, testMapstructMapper, mockTestMapstructSearchRepository);
            when(testMapstructRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTestMapstructMockMvc = MockMvcBuilders.standaloneSetup(testMapstructResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestMapstructMockMvc.perform(get("/api/test-mapstructs?eagerload=true"))
        .andExpect(status().isOk());

            verify(testMapstructRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTestMapstruct() throws Exception {
        // Initialize the database
        testMapstructRepository.saveAndFlush(testMapstruct);

        // Get the testMapstruct
        restTestMapstructMockMvc.perform(get("/api/test-mapstructs/{id}", testMapstruct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testMapstruct.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestMapstruct() throws Exception {
        // Get the testMapstruct
        restTestMapstructMockMvc.perform(get("/api/test-mapstructs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestMapstruct() throws Exception {
        // Initialize the database
        testMapstructRepository.saveAndFlush(testMapstruct);

        int databaseSizeBeforeUpdate = testMapstructRepository.findAll().size();

        // Update the testMapstruct
        TestMapstruct updatedTestMapstruct = testMapstructRepository.findById(testMapstruct.getId()).get();
        // Disconnect from session so that the updates on updatedTestMapstruct are not directly saved in db
        em.detach(updatedTestMapstruct);
        TestMapstructDTO testMapstructDTO = testMapstructMapper.toDto(updatedTestMapstruct);

        restTestMapstructMockMvc.perform(put("/api/test-mapstructs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMapstructDTO)))
            .andExpect(status().isOk());

        // Validate the TestMapstruct in the database
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeUpdate);
        TestMapstruct testTestMapstruct = testMapstructList.get(testMapstructList.size() - 1);

        // Validate the TestMapstruct in Elasticsearch
        verify(mockTestMapstructSearchRepository, times(1)).save(testTestMapstruct);
    }

    @Test
    @Transactional
    public void updateNonExistingTestMapstruct() throws Exception {
        int databaseSizeBeforeUpdate = testMapstructRepository.findAll().size();

        // Create the TestMapstruct
        TestMapstructDTO testMapstructDTO = testMapstructMapper.toDto(testMapstruct);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestMapstructMockMvc.perform(put("/api/test-mapstructs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMapstructDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TestMapstruct in the database
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestMapstruct in Elasticsearch
        verify(mockTestMapstructSearchRepository, times(0)).save(testMapstruct);
    }

    @Test
    @Transactional
    public void deleteTestMapstruct() throws Exception {
        // Initialize the database
        testMapstructRepository.saveAndFlush(testMapstruct);

        int databaseSizeBeforeDelete = testMapstructRepository.findAll().size();

        // Get the testMapstruct
        restTestMapstructMockMvc.perform(delete("/api/test-mapstructs/{id}", testMapstruct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestMapstruct> testMapstructList = testMapstructRepository.findAll();
        assertThat(testMapstructList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestMapstruct in Elasticsearch
        verify(mockTestMapstructSearchRepository, times(1)).deleteById(testMapstruct.getId());
    }

    @Test
    @Transactional
    public void searchTestMapstruct() throws Exception {
        // Initialize the database
        testMapstructRepository.saveAndFlush(testMapstruct);
        when(mockTestMapstructSearchRepository.search(queryStringQuery("id:" + testMapstruct.getId())))
            .thenReturn(Collections.singletonList(testMapstruct));
        // Search the testMapstruct
        restTestMapstructMockMvc.perform(get("/api/_search/test-mapstructs?query=id:" + testMapstruct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testMapstruct.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestMapstruct.class);
        TestMapstruct testMapstruct1 = new TestMapstruct();
        testMapstruct1.setId(1L);
        TestMapstruct testMapstruct2 = new TestMapstruct();
        testMapstruct2.setId(testMapstruct1.getId());
        assertThat(testMapstruct1).isEqualTo(testMapstruct2);
        testMapstruct2.setId(2L);
        assertThat(testMapstruct1).isNotEqualTo(testMapstruct2);
        testMapstruct1.setId(null);
        assertThat(testMapstruct1).isNotEqualTo(testMapstruct2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestMapstructDTO.class);
        TestMapstructDTO testMapstructDTO1 = new TestMapstructDTO();
        testMapstructDTO1.setId(1L);
        TestMapstructDTO testMapstructDTO2 = new TestMapstructDTO();
        assertThat(testMapstructDTO1).isNotEqualTo(testMapstructDTO2);
        testMapstructDTO2.setId(testMapstructDTO1.getId());
        assertThat(testMapstructDTO1).isEqualTo(testMapstructDTO2);
        testMapstructDTO2.setId(2L);
        assertThat(testMapstructDTO1).isNotEqualTo(testMapstructDTO2);
        testMapstructDTO1.setId(null);
        assertThat(testMapstructDTO1).isNotEqualTo(testMapstructDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(testMapstructMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(testMapstructMapper.fromId(null)).isNull();
    }
}
