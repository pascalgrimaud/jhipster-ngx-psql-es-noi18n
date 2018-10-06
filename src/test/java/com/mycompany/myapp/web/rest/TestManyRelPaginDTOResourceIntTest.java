package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestManyRelPaginDTO;
import com.mycompany.myapp.repository.TestManyRelPaginDTORepository;
import com.mycompany.myapp.repository.search.TestManyRelPaginDTOSearchRepository;
import com.mycompany.myapp.service.TestManyRelPaginDTOService;
import com.mycompany.myapp.service.dto.TestManyRelPaginDTODTO;
import com.mycompany.myapp.service.mapper.TestManyRelPaginDTOMapper;
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
 * Test class for the TestManyRelPaginDTOResource REST controller.
 *
 * @see TestManyRelPaginDTOResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestManyRelPaginDTOResourceIntTest {

    @Autowired
    private TestManyRelPaginDTORepository testManyRelPaginDTORepository;

    @Mock
    private TestManyRelPaginDTORepository testManyRelPaginDTORepositoryMock;

    @Autowired
    private TestManyRelPaginDTOMapper testManyRelPaginDTOMapper;
    

    @Mock
    private TestManyRelPaginDTOService testManyRelPaginDTOServiceMock;

    @Autowired
    private TestManyRelPaginDTOService testManyRelPaginDTOService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestManyRelPaginDTOSearchRepositoryMockConfiguration
     */
    @Autowired
    private TestManyRelPaginDTOSearchRepository mockTestManyRelPaginDTOSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestManyRelPaginDTOMockMvc;

    private TestManyRelPaginDTO testManyRelPaginDTO;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestManyRelPaginDTOResource testManyRelPaginDTOResource = new TestManyRelPaginDTOResource(testManyRelPaginDTOService);
        this.restTestManyRelPaginDTOMockMvc = MockMvcBuilders.standaloneSetup(testManyRelPaginDTOResource)
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
    public static TestManyRelPaginDTO createEntity(EntityManager em) {
        TestManyRelPaginDTO testManyRelPaginDTO = new TestManyRelPaginDTO();
        return testManyRelPaginDTO;
    }

    @Before
    public void initTest() {
        testManyRelPaginDTO = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestManyRelPaginDTO() throws Exception {
        int databaseSizeBeforeCreate = testManyRelPaginDTORepository.findAll().size();

        // Create the TestManyRelPaginDTO
        TestManyRelPaginDTODTO testManyRelPaginDTODTO = testManyRelPaginDTOMapper.toDto(testManyRelPaginDTO);
        restTestManyRelPaginDTOMockMvc.perform(post("/api/test-many-rel-pagin-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyRelPaginDTODTO)))
            .andExpect(status().isCreated());

        // Validate the TestManyRelPaginDTO in the database
        List<TestManyRelPaginDTO> testManyRelPaginDTOList = testManyRelPaginDTORepository.findAll();
        assertThat(testManyRelPaginDTOList).hasSize(databaseSizeBeforeCreate + 1);
        TestManyRelPaginDTO testTestManyRelPaginDTO = testManyRelPaginDTOList.get(testManyRelPaginDTOList.size() - 1);

        // Validate the TestManyRelPaginDTO in Elasticsearch
        verify(mockTestManyRelPaginDTOSearchRepository, times(1)).save(testTestManyRelPaginDTO);
    }

    @Test
    @Transactional
    public void createTestManyRelPaginDTOWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testManyRelPaginDTORepository.findAll().size();

        // Create the TestManyRelPaginDTO with an existing ID
        testManyRelPaginDTO.setId(1L);
        TestManyRelPaginDTODTO testManyRelPaginDTODTO = testManyRelPaginDTOMapper.toDto(testManyRelPaginDTO);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestManyRelPaginDTOMockMvc.perform(post("/api/test-many-rel-pagin-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyRelPaginDTODTO)))
            .andExpect(status().isBadRequest());

        // Validate the TestManyRelPaginDTO in the database
        List<TestManyRelPaginDTO> testManyRelPaginDTOList = testManyRelPaginDTORepository.findAll();
        assertThat(testManyRelPaginDTOList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestManyRelPaginDTO in Elasticsearch
        verify(mockTestManyRelPaginDTOSearchRepository, times(0)).save(testManyRelPaginDTO);
    }

    @Test
    @Transactional
    public void getAllTestManyRelPaginDTOS() throws Exception {
        // Initialize the database
        testManyRelPaginDTORepository.saveAndFlush(testManyRelPaginDTO);

        // Get all the testManyRelPaginDTOList
        restTestManyRelPaginDTOMockMvc.perform(get("/api/test-many-rel-pagin-dtos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testManyRelPaginDTO.getId().intValue())));
    }
    
    public void getAllTestManyRelPaginDTOSWithEagerRelationshipsIsEnabled() throws Exception {
        TestManyRelPaginDTOResource testManyRelPaginDTOResource = new TestManyRelPaginDTOResource(testManyRelPaginDTOServiceMock);
        when(testManyRelPaginDTOServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTestManyRelPaginDTOMockMvc = MockMvcBuilders.standaloneSetup(testManyRelPaginDTOResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestManyRelPaginDTOMockMvc.perform(get("/api/test-many-rel-pagin-dtos?eagerload=true"))
        .andExpect(status().isOk());

        verify(testManyRelPaginDTOServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTestManyRelPaginDTOSWithEagerRelationshipsIsNotEnabled() throws Exception {
        TestManyRelPaginDTOResource testManyRelPaginDTOResource = new TestManyRelPaginDTOResource(testManyRelPaginDTOServiceMock);
            when(testManyRelPaginDTOServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTestManyRelPaginDTOMockMvc = MockMvcBuilders.standaloneSetup(testManyRelPaginDTOResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestManyRelPaginDTOMockMvc.perform(get("/api/test-many-rel-pagin-dtos?eagerload=true"))
        .andExpect(status().isOk());

            verify(testManyRelPaginDTOServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTestManyRelPaginDTO() throws Exception {
        // Initialize the database
        testManyRelPaginDTORepository.saveAndFlush(testManyRelPaginDTO);

        // Get the testManyRelPaginDTO
        restTestManyRelPaginDTOMockMvc.perform(get("/api/test-many-rel-pagin-dtos/{id}", testManyRelPaginDTO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testManyRelPaginDTO.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTestManyRelPaginDTO() throws Exception {
        // Get the testManyRelPaginDTO
        restTestManyRelPaginDTOMockMvc.perform(get("/api/test-many-rel-pagin-dtos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestManyRelPaginDTO() throws Exception {
        // Initialize the database
        testManyRelPaginDTORepository.saveAndFlush(testManyRelPaginDTO);

        int databaseSizeBeforeUpdate = testManyRelPaginDTORepository.findAll().size();

        // Update the testManyRelPaginDTO
        TestManyRelPaginDTO updatedTestManyRelPaginDTO = testManyRelPaginDTORepository.findById(testManyRelPaginDTO.getId()).get();
        // Disconnect from session so that the updates on updatedTestManyRelPaginDTO are not directly saved in db
        em.detach(updatedTestManyRelPaginDTO);
        TestManyRelPaginDTODTO testManyRelPaginDTODTO = testManyRelPaginDTOMapper.toDto(updatedTestManyRelPaginDTO);

        restTestManyRelPaginDTOMockMvc.perform(put("/api/test-many-rel-pagin-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyRelPaginDTODTO)))
            .andExpect(status().isOk());

        // Validate the TestManyRelPaginDTO in the database
        List<TestManyRelPaginDTO> testManyRelPaginDTOList = testManyRelPaginDTORepository.findAll();
        assertThat(testManyRelPaginDTOList).hasSize(databaseSizeBeforeUpdate);
        TestManyRelPaginDTO testTestManyRelPaginDTO = testManyRelPaginDTOList.get(testManyRelPaginDTOList.size() - 1);

        // Validate the TestManyRelPaginDTO in Elasticsearch
        verify(mockTestManyRelPaginDTOSearchRepository, times(1)).save(testTestManyRelPaginDTO);
    }

    @Test
    @Transactional
    public void updateNonExistingTestManyRelPaginDTO() throws Exception {
        int databaseSizeBeforeUpdate = testManyRelPaginDTORepository.findAll().size();

        // Create the TestManyRelPaginDTO
        TestManyRelPaginDTODTO testManyRelPaginDTODTO = testManyRelPaginDTOMapper.toDto(testManyRelPaginDTO);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestManyRelPaginDTOMockMvc.perform(put("/api/test-many-rel-pagin-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testManyRelPaginDTODTO)))
            .andExpect(status().isBadRequest());

        // Validate the TestManyRelPaginDTO in the database
        List<TestManyRelPaginDTO> testManyRelPaginDTOList = testManyRelPaginDTORepository.findAll();
        assertThat(testManyRelPaginDTOList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestManyRelPaginDTO in Elasticsearch
        verify(mockTestManyRelPaginDTOSearchRepository, times(0)).save(testManyRelPaginDTO);
    }

    @Test
    @Transactional
    public void deleteTestManyRelPaginDTO() throws Exception {
        // Initialize the database
        testManyRelPaginDTORepository.saveAndFlush(testManyRelPaginDTO);

        int databaseSizeBeforeDelete = testManyRelPaginDTORepository.findAll().size();

        // Get the testManyRelPaginDTO
        restTestManyRelPaginDTOMockMvc.perform(delete("/api/test-many-rel-pagin-dtos/{id}", testManyRelPaginDTO.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestManyRelPaginDTO> testManyRelPaginDTOList = testManyRelPaginDTORepository.findAll();
        assertThat(testManyRelPaginDTOList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestManyRelPaginDTO in Elasticsearch
        verify(mockTestManyRelPaginDTOSearchRepository, times(1)).deleteById(testManyRelPaginDTO.getId());
    }

    @Test
    @Transactional
    public void searchTestManyRelPaginDTO() throws Exception {
        // Initialize the database
        testManyRelPaginDTORepository.saveAndFlush(testManyRelPaginDTO);
        when(mockTestManyRelPaginDTOSearchRepository.search(queryStringQuery("id:" + testManyRelPaginDTO.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(testManyRelPaginDTO), PageRequest.of(0, 1), 1));
        // Search the testManyRelPaginDTO
        restTestManyRelPaginDTOMockMvc.perform(get("/api/_search/test-many-rel-pagin-dtos?query=id:" + testManyRelPaginDTO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testManyRelPaginDTO.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestManyRelPaginDTO.class);
        TestManyRelPaginDTO testManyRelPaginDTO1 = new TestManyRelPaginDTO();
        testManyRelPaginDTO1.setId(1L);
        TestManyRelPaginDTO testManyRelPaginDTO2 = new TestManyRelPaginDTO();
        testManyRelPaginDTO2.setId(testManyRelPaginDTO1.getId());
        assertThat(testManyRelPaginDTO1).isEqualTo(testManyRelPaginDTO2);
        testManyRelPaginDTO2.setId(2L);
        assertThat(testManyRelPaginDTO1).isNotEqualTo(testManyRelPaginDTO2);
        testManyRelPaginDTO1.setId(null);
        assertThat(testManyRelPaginDTO1).isNotEqualTo(testManyRelPaginDTO2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestManyRelPaginDTODTO.class);
        TestManyRelPaginDTODTO testManyRelPaginDTODTO1 = new TestManyRelPaginDTODTO();
        testManyRelPaginDTODTO1.setId(1L);
        TestManyRelPaginDTODTO testManyRelPaginDTODTO2 = new TestManyRelPaginDTODTO();
        assertThat(testManyRelPaginDTODTO1).isNotEqualTo(testManyRelPaginDTODTO2);
        testManyRelPaginDTODTO2.setId(testManyRelPaginDTODTO1.getId());
        assertThat(testManyRelPaginDTODTO1).isEqualTo(testManyRelPaginDTODTO2);
        testManyRelPaginDTODTO2.setId(2L);
        assertThat(testManyRelPaginDTODTO1).isNotEqualTo(testManyRelPaginDTODTO2);
        testManyRelPaginDTODTO1.setId(null);
        assertThat(testManyRelPaginDTODTO1).isNotEqualTo(testManyRelPaginDTODTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(testManyRelPaginDTOMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(testManyRelPaginDTOMapper.fromId(null)).isNull();
    }
}
