package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.EntityWithServiceClassPaginationAndDTO;
import com.mycompany.myapp.repository.EntityWithServiceClassPaginationAndDTORepository;
import com.mycompany.myapp.repository.search.EntityWithServiceClassPaginationAndDTOSearchRepository;
import com.mycompany.myapp.service.EntityWithServiceClassPaginationAndDTOService;
import com.mycompany.myapp.service.dto.EntityWithServiceClassPaginationAndDTODTO;
import com.mycompany.myapp.service.mapper.EntityWithServiceClassPaginationAndDTOMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
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
 * Test class for the EntityWithServiceClassPaginationAndDTOResource REST controller.
 *
 * @see EntityWithServiceClassPaginationAndDTOResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class EntityWithServiceClassPaginationAndDTOResourceIntTest {

    private static final String DEFAULT_LENA = "AAAAAAAAAA";
    private static final String UPDATED_LENA = "BBBBBBBBBB";

    @Autowired
    private EntityWithServiceClassPaginationAndDTORepository entityWithServiceClassPaginationAndDTORepository;

    @Autowired
    private EntityWithServiceClassPaginationAndDTOMapper entityWithServiceClassPaginationAndDTOMapper;
    
    @Autowired
    private EntityWithServiceClassPaginationAndDTOService entityWithServiceClassPaginationAndDTOService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.EntityWithServiceClassPaginationAndDTOSearchRepositoryMockConfiguration
     */
    @Autowired
    private EntityWithServiceClassPaginationAndDTOSearchRepository mockEntityWithServiceClassPaginationAndDTOSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEntityWithServiceClassPaginationAndDTOMockMvc;

    private EntityWithServiceClassPaginationAndDTO entityWithServiceClassPaginationAndDTO;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntityWithServiceClassPaginationAndDTOResource entityWithServiceClassPaginationAndDTOResource = new EntityWithServiceClassPaginationAndDTOResource(entityWithServiceClassPaginationAndDTOService);
        this.restEntityWithServiceClassPaginationAndDTOMockMvc = MockMvcBuilders.standaloneSetup(entityWithServiceClassPaginationAndDTOResource)
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
    public static EntityWithServiceClassPaginationAndDTO createEntity(EntityManager em) {
        EntityWithServiceClassPaginationAndDTO entityWithServiceClassPaginationAndDTO = new EntityWithServiceClassPaginationAndDTO()
            .lena(DEFAULT_LENA);
        return entityWithServiceClassPaginationAndDTO;
    }

    @Before
    public void initTest() {
        entityWithServiceClassPaginationAndDTO = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntityWithServiceClassPaginationAndDTO() throws Exception {
        int databaseSizeBeforeCreate = entityWithServiceClassPaginationAndDTORepository.findAll().size();

        // Create the EntityWithServiceClassPaginationAndDTO
        EntityWithServiceClassPaginationAndDTODTO entityWithServiceClassPaginationAndDTODTO = entityWithServiceClassPaginationAndDTOMapper.toDto(entityWithServiceClassPaginationAndDTO);
        restEntityWithServiceClassPaginationAndDTOMockMvc.perform(post("/api/entity-with-service-class-pagination-and-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceClassPaginationAndDTODTO)))
            .andExpect(status().isCreated());

        // Validate the EntityWithServiceClassPaginationAndDTO in the database
        List<EntityWithServiceClassPaginationAndDTO> entityWithServiceClassPaginationAndDTOList = entityWithServiceClassPaginationAndDTORepository.findAll();
        assertThat(entityWithServiceClassPaginationAndDTOList).hasSize(databaseSizeBeforeCreate + 1);
        EntityWithServiceClassPaginationAndDTO testEntityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTOList.get(entityWithServiceClassPaginationAndDTOList.size() - 1);
        assertThat(testEntityWithServiceClassPaginationAndDTO.getLena()).isEqualTo(DEFAULT_LENA);

        // Validate the EntityWithServiceClassPaginationAndDTO in Elasticsearch
        verify(mockEntityWithServiceClassPaginationAndDTOSearchRepository, times(1)).save(testEntityWithServiceClassPaginationAndDTO);
    }

    @Test
    @Transactional
    public void createEntityWithServiceClassPaginationAndDTOWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entityWithServiceClassPaginationAndDTORepository.findAll().size();

        // Create the EntityWithServiceClassPaginationAndDTO with an existing ID
        entityWithServiceClassPaginationAndDTO.setId(1L);
        EntityWithServiceClassPaginationAndDTODTO entityWithServiceClassPaginationAndDTODTO = entityWithServiceClassPaginationAndDTOMapper.toDto(entityWithServiceClassPaginationAndDTO);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntityWithServiceClassPaginationAndDTOMockMvc.perform(post("/api/entity-with-service-class-pagination-and-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceClassPaginationAndDTODTO)))
            .andExpect(status().isBadRequest());

        // Validate the EntityWithServiceClassPaginationAndDTO in the database
        List<EntityWithServiceClassPaginationAndDTO> entityWithServiceClassPaginationAndDTOList = entityWithServiceClassPaginationAndDTORepository.findAll();
        assertThat(entityWithServiceClassPaginationAndDTOList).hasSize(databaseSizeBeforeCreate);

        // Validate the EntityWithServiceClassPaginationAndDTO in Elasticsearch
        verify(mockEntityWithServiceClassPaginationAndDTOSearchRepository, times(0)).save(entityWithServiceClassPaginationAndDTO);
    }

    @Test
    @Transactional
    public void getAllEntityWithServiceClassPaginationAndDTOS() throws Exception {
        // Initialize the database
        entityWithServiceClassPaginationAndDTORepository.saveAndFlush(entityWithServiceClassPaginationAndDTO);

        // Get all the entityWithServiceClassPaginationAndDTOList
        restEntityWithServiceClassPaginationAndDTOMockMvc.perform(get("/api/entity-with-service-class-pagination-and-dtos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entityWithServiceClassPaginationAndDTO.getId().intValue())))
            .andExpect(jsonPath("$.[*].lena").value(hasItem(DEFAULT_LENA.toString())));
    }
    
    @Test
    @Transactional
    public void getEntityWithServiceClassPaginationAndDTO() throws Exception {
        // Initialize the database
        entityWithServiceClassPaginationAndDTORepository.saveAndFlush(entityWithServiceClassPaginationAndDTO);

        // Get the entityWithServiceClassPaginationAndDTO
        restEntityWithServiceClassPaginationAndDTOMockMvc.perform(get("/api/entity-with-service-class-pagination-and-dtos/{id}", entityWithServiceClassPaginationAndDTO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entityWithServiceClassPaginationAndDTO.getId().intValue()))
            .andExpect(jsonPath("$.lena").value(DEFAULT_LENA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntityWithServiceClassPaginationAndDTO() throws Exception {
        // Get the entityWithServiceClassPaginationAndDTO
        restEntityWithServiceClassPaginationAndDTOMockMvc.perform(get("/api/entity-with-service-class-pagination-and-dtos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntityWithServiceClassPaginationAndDTO() throws Exception {
        // Initialize the database
        entityWithServiceClassPaginationAndDTORepository.saveAndFlush(entityWithServiceClassPaginationAndDTO);

        int databaseSizeBeforeUpdate = entityWithServiceClassPaginationAndDTORepository.findAll().size();

        // Update the entityWithServiceClassPaginationAndDTO
        EntityWithServiceClassPaginationAndDTO updatedEntityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTORepository.findById(entityWithServiceClassPaginationAndDTO.getId()).get();
        // Disconnect from session so that the updates on updatedEntityWithServiceClassPaginationAndDTO are not directly saved in db
        em.detach(updatedEntityWithServiceClassPaginationAndDTO);
        updatedEntityWithServiceClassPaginationAndDTO
            .lena(UPDATED_LENA);
        EntityWithServiceClassPaginationAndDTODTO entityWithServiceClassPaginationAndDTODTO = entityWithServiceClassPaginationAndDTOMapper.toDto(updatedEntityWithServiceClassPaginationAndDTO);

        restEntityWithServiceClassPaginationAndDTOMockMvc.perform(put("/api/entity-with-service-class-pagination-and-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceClassPaginationAndDTODTO)))
            .andExpect(status().isOk());

        // Validate the EntityWithServiceClassPaginationAndDTO in the database
        List<EntityWithServiceClassPaginationAndDTO> entityWithServiceClassPaginationAndDTOList = entityWithServiceClassPaginationAndDTORepository.findAll();
        assertThat(entityWithServiceClassPaginationAndDTOList).hasSize(databaseSizeBeforeUpdate);
        EntityWithServiceClassPaginationAndDTO testEntityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTOList.get(entityWithServiceClassPaginationAndDTOList.size() - 1);
        assertThat(testEntityWithServiceClassPaginationAndDTO.getLena()).isEqualTo(UPDATED_LENA);

        // Validate the EntityWithServiceClassPaginationAndDTO in Elasticsearch
        verify(mockEntityWithServiceClassPaginationAndDTOSearchRepository, times(1)).save(testEntityWithServiceClassPaginationAndDTO);
    }

    @Test
    @Transactional
    public void updateNonExistingEntityWithServiceClassPaginationAndDTO() throws Exception {
        int databaseSizeBeforeUpdate = entityWithServiceClassPaginationAndDTORepository.findAll().size();

        // Create the EntityWithServiceClassPaginationAndDTO
        EntityWithServiceClassPaginationAndDTODTO entityWithServiceClassPaginationAndDTODTO = entityWithServiceClassPaginationAndDTOMapper.toDto(entityWithServiceClassPaginationAndDTO);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntityWithServiceClassPaginationAndDTOMockMvc.perform(put("/api/entity-with-service-class-pagination-and-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceClassPaginationAndDTODTO)))
            .andExpect(status().isBadRequest());

        // Validate the EntityWithServiceClassPaginationAndDTO in the database
        List<EntityWithServiceClassPaginationAndDTO> entityWithServiceClassPaginationAndDTOList = entityWithServiceClassPaginationAndDTORepository.findAll();
        assertThat(entityWithServiceClassPaginationAndDTOList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EntityWithServiceClassPaginationAndDTO in Elasticsearch
        verify(mockEntityWithServiceClassPaginationAndDTOSearchRepository, times(0)).save(entityWithServiceClassPaginationAndDTO);
    }

    @Test
    @Transactional
    public void deleteEntityWithServiceClassPaginationAndDTO() throws Exception {
        // Initialize the database
        entityWithServiceClassPaginationAndDTORepository.saveAndFlush(entityWithServiceClassPaginationAndDTO);

        int databaseSizeBeforeDelete = entityWithServiceClassPaginationAndDTORepository.findAll().size();

        // Get the entityWithServiceClassPaginationAndDTO
        restEntityWithServiceClassPaginationAndDTOMockMvc.perform(delete("/api/entity-with-service-class-pagination-and-dtos/{id}", entityWithServiceClassPaginationAndDTO.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EntityWithServiceClassPaginationAndDTO> entityWithServiceClassPaginationAndDTOList = entityWithServiceClassPaginationAndDTORepository.findAll();
        assertThat(entityWithServiceClassPaginationAndDTOList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EntityWithServiceClassPaginationAndDTO in Elasticsearch
        verify(mockEntityWithServiceClassPaginationAndDTOSearchRepository, times(1)).deleteById(entityWithServiceClassPaginationAndDTO.getId());
    }

    @Test
    @Transactional
    public void searchEntityWithServiceClassPaginationAndDTO() throws Exception {
        // Initialize the database
        entityWithServiceClassPaginationAndDTORepository.saveAndFlush(entityWithServiceClassPaginationAndDTO);
        when(mockEntityWithServiceClassPaginationAndDTOSearchRepository.search(queryStringQuery("id:" + entityWithServiceClassPaginationAndDTO.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(entityWithServiceClassPaginationAndDTO), PageRequest.of(0, 1), 1));
        // Search the entityWithServiceClassPaginationAndDTO
        restEntityWithServiceClassPaginationAndDTOMockMvc.perform(get("/api/_search/entity-with-service-class-pagination-and-dtos?query=id:" + entityWithServiceClassPaginationAndDTO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entityWithServiceClassPaginationAndDTO.getId().intValue())))
            .andExpect(jsonPath("$.[*].lena").value(hasItem(DEFAULT_LENA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntityWithServiceClassPaginationAndDTO.class);
        EntityWithServiceClassPaginationAndDTO entityWithServiceClassPaginationAndDTO1 = new EntityWithServiceClassPaginationAndDTO();
        entityWithServiceClassPaginationAndDTO1.setId(1L);
        EntityWithServiceClassPaginationAndDTO entityWithServiceClassPaginationAndDTO2 = new EntityWithServiceClassPaginationAndDTO();
        entityWithServiceClassPaginationAndDTO2.setId(entityWithServiceClassPaginationAndDTO1.getId());
        assertThat(entityWithServiceClassPaginationAndDTO1).isEqualTo(entityWithServiceClassPaginationAndDTO2);
        entityWithServiceClassPaginationAndDTO2.setId(2L);
        assertThat(entityWithServiceClassPaginationAndDTO1).isNotEqualTo(entityWithServiceClassPaginationAndDTO2);
        entityWithServiceClassPaginationAndDTO1.setId(null);
        assertThat(entityWithServiceClassPaginationAndDTO1).isNotEqualTo(entityWithServiceClassPaginationAndDTO2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntityWithServiceClassPaginationAndDTODTO.class);
        EntityWithServiceClassPaginationAndDTODTO entityWithServiceClassPaginationAndDTODTO1 = new EntityWithServiceClassPaginationAndDTODTO();
        entityWithServiceClassPaginationAndDTODTO1.setId(1L);
        EntityWithServiceClassPaginationAndDTODTO entityWithServiceClassPaginationAndDTODTO2 = new EntityWithServiceClassPaginationAndDTODTO();
        assertThat(entityWithServiceClassPaginationAndDTODTO1).isNotEqualTo(entityWithServiceClassPaginationAndDTODTO2);
        entityWithServiceClassPaginationAndDTODTO2.setId(entityWithServiceClassPaginationAndDTODTO1.getId());
        assertThat(entityWithServiceClassPaginationAndDTODTO1).isEqualTo(entityWithServiceClassPaginationAndDTODTO2);
        entityWithServiceClassPaginationAndDTODTO2.setId(2L);
        assertThat(entityWithServiceClassPaginationAndDTODTO1).isNotEqualTo(entityWithServiceClassPaginationAndDTODTO2);
        entityWithServiceClassPaginationAndDTODTO1.setId(null);
        assertThat(entityWithServiceClassPaginationAndDTODTO1).isNotEqualTo(entityWithServiceClassPaginationAndDTODTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(entityWithServiceClassPaginationAndDTOMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(entityWithServiceClassPaginationAndDTOMapper.fromId(null)).isNull();
    }
}
