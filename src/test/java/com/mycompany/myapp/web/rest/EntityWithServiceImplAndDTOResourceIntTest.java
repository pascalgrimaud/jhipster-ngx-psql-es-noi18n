package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.EntityWithServiceImplAndDTO;
import com.mycompany.myapp.repository.EntityWithServiceImplAndDTORepository;
import com.mycompany.myapp.repository.search.EntityWithServiceImplAndDTOSearchRepository;
import com.mycompany.myapp.service.EntityWithServiceImplAndDTOService;
import com.mycompany.myapp.service.dto.EntityWithServiceImplAndDTODTO;
import com.mycompany.myapp.service.mapper.EntityWithServiceImplAndDTOMapper;
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
 * Test class for the EntityWithServiceImplAndDTOResource REST controller.
 *
 * @see EntityWithServiceImplAndDTOResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class EntityWithServiceImplAndDTOResourceIntTest {

    private static final String DEFAULT_LOUIS = "AAAAAAAAAA";
    private static final String UPDATED_LOUIS = "BBBBBBBBBB";

    @Autowired
    private EntityWithServiceImplAndDTORepository entityWithServiceImplAndDTORepository;

    @Autowired
    private EntityWithServiceImplAndDTOMapper entityWithServiceImplAndDTOMapper;
    
    @Autowired
    private EntityWithServiceImplAndDTOService entityWithServiceImplAndDTOService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.EntityWithServiceImplAndDTOSearchRepositoryMockConfiguration
     */
    @Autowired
    private EntityWithServiceImplAndDTOSearchRepository mockEntityWithServiceImplAndDTOSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEntityWithServiceImplAndDTOMockMvc;

    private EntityWithServiceImplAndDTO entityWithServiceImplAndDTO;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntityWithServiceImplAndDTOResource entityWithServiceImplAndDTOResource = new EntityWithServiceImplAndDTOResource(entityWithServiceImplAndDTOService);
        this.restEntityWithServiceImplAndDTOMockMvc = MockMvcBuilders.standaloneSetup(entityWithServiceImplAndDTOResource)
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
    public static EntityWithServiceImplAndDTO createEntity(EntityManager em) {
        EntityWithServiceImplAndDTO entityWithServiceImplAndDTO = new EntityWithServiceImplAndDTO()
            .louis(DEFAULT_LOUIS);
        return entityWithServiceImplAndDTO;
    }

    @Before
    public void initTest() {
        entityWithServiceImplAndDTO = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntityWithServiceImplAndDTO() throws Exception {
        int databaseSizeBeforeCreate = entityWithServiceImplAndDTORepository.findAll().size();

        // Create the EntityWithServiceImplAndDTO
        EntityWithServiceImplAndDTODTO entityWithServiceImplAndDTODTO = entityWithServiceImplAndDTOMapper.toDto(entityWithServiceImplAndDTO);
        restEntityWithServiceImplAndDTOMockMvc.perform(post("/api/entity-with-service-impl-and-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceImplAndDTODTO)))
            .andExpect(status().isCreated());

        // Validate the EntityWithServiceImplAndDTO in the database
        List<EntityWithServiceImplAndDTO> entityWithServiceImplAndDTOList = entityWithServiceImplAndDTORepository.findAll();
        assertThat(entityWithServiceImplAndDTOList).hasSize(databaseSizeBeforeCreate + 1);
        EntityWithServiceImplAndDTO testEntityWithServiceImplAndDTO = entityWithServiceImplAndDTOList.get(entityWithServiceImplAndDTOList.size() - 1);
        assertThat(testEntityWithServiceImplAndDTO.getLouis()).isEqualTo(DEFAULT_LOUIS);

        // Validate the EntityWithServiceImplAndDTO in Elasticsearch
        verify(mockEntityWithServiceImplAndDTOSearchRepository, times(1)).save(testEntityWithServiceImplAndDTO);
    }

    @Test
    @Transactional
    public void createEntityWithServiceImplAndDTOWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entityWithServiceImplAndDTORepository.findAll().size();

        // Create the EntityWithServiceImplAndDTO with an existing ID
        entityWithServiceImplAndDTO.setId(1L);
        EntityWithServiceImplAndDTODTO entityWithServiceImplAndDTODTO = entityWithServiceImplAndDTOMapper.toDto(entityWithServiceImplAndDTO);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntityWithServiceImplAndDTOMockMvc.perform(post("/api/entity-with-service-impl-and-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceImplAndDTODTO)))
            .andExpect(status().isBadRequest());

        // Validate the EntityWithServiceImplAndDTO in the database
        List<EntityWithServiceImplAndDTO> entityWithServiceImplAndDTOList = entityWithServiceImplAndDTORepository.findAll();
        assertThat(entityWithServiceImplAndDTOList).hasSize(databaseSizeBeforeCreate);

        // Validate the EntityWithServiceImplAndDTO in Elasticsearch
        verify(mockEntityWithServiceImplAndDTOSearchRepository, times(0)).save(entityWithServiceImplAndDTO);
    }

    @Test
    @Transactional
    public void getAllEntityWithServiceImplAndDTOS() throws Exception {
        // Initialize the database
        entityWithServiceImplAndDTORepository.saveAndFlush(entityWithServiceImplAndDTO);

        // Get all the entityWithServiceImplAndDTOList
        restEntityWithServiceImplAndDTOMockMvc.perform(get("/api/entity-with-service-impl-and-dtos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entityWithServiceImplAndDTO.getId().intValue())))
            .andExpect(jsonPath("$.[*].louis").value(hasItem(DEFAULT_LOUIS.toString())));
    }
    
    @Test
    @Transactional
    public void getEntityWithServiceImplAndDTO() throws Exception {
        // Initialize the database
        entityWithServiceImplAndDTORepository.saveAndFlush(entityWithServiceImplAndDTO);

        // Get the entityWithServiceImplAndDTO
        restEntityWithServiceImplAndDTOMockMvc.perform(get("/api/entity-with-service-impl-and-dtos/{id}", entityWithServiceImplAndDTO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entityWithServiceImplAndDTO.getId().intValue()))
            .andExpect(jsonPath("$.louis").value(DEFAULT_LOUIS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntityWithServiceImplAndDTO() throws Exception {
        // Get the entityWithServiceImplAndDTO
        restEntityWithServiceImplAndDTOMockMvc.perform(get("/api/entity-with-service-impl-and-dtos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntityWithServiceImplAndDTO() throws Exception {
        // Initialize the database
        entityWithServiceImplAndDTORepository.saveAndFlush(entityWithServiceImplAndDTO);

        int databaseSizeBeforeUpdate = entityWithServiceImplAndDTORepository.findAll().size();

        // Update the entityWithServiceImplAndDTO
        EntityWithServiceImplAndDTO updatedEntityWithServiceImplAndDTO = entityWithServiceImplAndDTORepository.findById(entityWithServiceImplAndDTO.getId()).get();
        // Disconnect from session so that the updates on updatedEntityWithServiceImplAndDTO are not directly saved in db
        em.detach(updatedEntityWithServiceImplAndDTO);
        updatedEntityWithServiceImplAndDTO
            .louis(UPDATED_LOUIS);
        EntityWithServiceImplAndDTODTO entityWithServiceImplAndDTODTO = entityWithServiceImplAndDTOMapper.toDto(updatedEntityWithServiceImplAndDTO);

        restEntityWithServiceImplAndDTOMockMvc.perform(put("/api/entity-with-service-impl-and-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceImplAndDTODTO)))
            .andExpect(status().isOk());

        // Validate the EntityWithServiceImplAndDTO in the database
        List<EntityWithServiceImplAndDTO> entityWithServiceImplAndDTOList = entityWithServiceImplAndDTORepository.findAll();
        assertThat(entityWithServiceImplAndDTOList).hasSize(databaseSizeBeforeUpdate);
        EntityWithServiceImplAndDTO testEntityWithServiceImplAndDTO = entityWithServiceImplAndDTOList.get(entityWithServiceImplAndDTOList.size() - 1);
        assertThat(testEntityWithServiceImplAndDTO.getLouis()).isEqualTo(UPDATED_LOUIS);

        // Validate the EntityWithServiceImplAndDTO in Elasticsearch
        verify(mockEntityWithServiceImplAndDTOSearchRepository, times(1)).save(testEntityWithServiceImplAndDTO);
    }

    @Test
    @Transactional
    public void updateNonExistingEntityWithServiceImplAndDTO() throws Exception {
        int databaseSizeBeforeUpdate = entityWithServiceImplAndDTORepository.findAll().size();

        // Create the EntityWithServiceImplAndDTO
        EntityWithServiceImplAndDTODTO entityWithServiceImplAndDTODTO = entityWithServiceImplAndDTOMapper.toDto(entityWithServiceImplAndDTO);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntityWithServiceImplAndDTOMockMvc.perform(put("/api/entity-with-service-impl-and-dtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceImplAndDTODTO)))
            .andExpect(status().isBadRequest());

        // Validate the EntityWithServiceImplAndDTO in the database
        List<EntityWithServiceImplAndDTO> entityWithServiceImplAndDTOList = entityWithServiceImplAndDTORepository.findAll();
        assertThat(entityWithServiceImplAndDTOList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EntityWithServiceImplAndDTO in Elasticsearch
        verify(mockEntityWithServiceImplAndDTOSearchRepository, times(0)).save(entityWithServiceImplAndDTO);
    }

    @Test
    @Transactional
    public void deleteEntityWithServiceImplAndDTO() throws Exception {
        // Initialize the database
        entityWithServiceImplAndDTORepository.saveAndFlush(entityWithServiceImplAndDTO);

        int databaseSizeBeforeDelete = entityWithServiceImplAndDTORepository.findAll().size();

        // Get the entityWithServiceImplAndDTO
        restEntityWithServiceImplAndDTOMockMvc.perform(delete("/api/entity-with-service-impl-and-dtos/{id}", entityWithServiceImplAndDTO.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EntityWithServiceImplAndDTO> entityWithServiceImplAndDTOList = entityWithServiceImplAndDTORepository.findAll();
        assertThat(entityWithServiceImplAndDTOList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EntityWithServiceImplAndDTO in Elasticsearch
        verify(mockEntityWithServiceImplAndDTOSearchRepository, times(1)).deleteById(entityWithServiceImplAndDTO.getId());
    }

    @Test
    @Transactional
    public void searchEntityWithServiceImplAndDTO() throws Exception {
        // Initialize the database
        entityWithServiceImplAndDTORepository.saveAndFlush(entityWithServiceImplAndDTO);
        when(mockEntityWithServiceImplAndDTOSearchRepository.search(queryStringQuery("id:" + entityWithServiceImplAndDTO.getId())))
            .thenReturn(Collections.singletonList(entityWithServiceImplAndDTO));
        // Search the entityWithServiceImplAndDTO
        restEntityWithServiceImplAndDTOMockMvc.perform(get("/api/_search/entity-with-service-impl-and-dtos?query=id:" + entityWithServiceImplAndDTO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entityWithServiceImplAndDTO.getId().intValue())))
            .andExpect(jsonPath("$.[*].louis").value(hasItem(DEFAULT_LOUIS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntityWithServiceImplAndDTO.class);
        EntityWithServiceImplAndDTO entityWithServiceImplAndDTO1 = new EntityWithServiceImplAndDTO();
        entityWithServiceImplAndDTO1.setId(1L);
        EntityWithServiceImplAndDTO entityWithServiceImplAndDTO2 = new EntityWithServiceImplAndDTO();
        entityWithServiceImplAndDTO2.setId(entityWithServiceImplAndDTO1.getId());
        assertThat(entityWithServiceImplAndDTO1).isEqualTo(entityWithServiceImplAndDTO2);
        entityWithServiceImplAndDTO2.setId(2L);
        assertThat(entityWithServiceImplAndDTO1).isNotEqualTo(entityWithServiceImplAndDTO2);
        entityWithServiceImplAndDTO1.setId(null);
        assertThat(entityWithServiceImplAndDTO1).isNotEqualTo(entityWithServiceImplAndDTO2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntityWithServiceImplAndDTODTO.class);
        EntityWithServiceImplAndDTODTO entityWithServiceImplAndDTODTO1 = new EntityWithServiceImplAndDTODTO();
        entityWithServiceImplAndDTODTO1.setId(1L);
        EntityWithServiceImplAndDTODTO entityWithServiceImplAndDTODTO2 = new EntityWithServiceImplAndDTODTO();
        assertThat(entityWithServiceImplAndDTODTO1).isNotEqualTo(entityWithServiceImplAndDTODTO2);
        entityWithServiceImplAndDTODTO2.setId(entityWithServiceImplAndDTODTO1.getId());
        assertThat(entityWithServiceImplAndDTODTO1).isEqualTo(entityWithServiceImplAndDTODTO2);
        entityWithServiceImplAndDTODTO2.setId(2L);
        assertThat(entityWithServiceImplAndDTODTO1).isNotEqualTo(entityWithServiceImplAndDTODTO2);
        entityWithServiceImplAndDTODTO1.setId(null);
        assertThat(entityWithServiceImplAndDTODTO1).isNotEqualTo(entityWithServiceImplAndDTODTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(entityWithServiceImplAndDTOMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(entityWithServiceImplAndDTOMapper.fromId(null)).isNull();
    }
}
