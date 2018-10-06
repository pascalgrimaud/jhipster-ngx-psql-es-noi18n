package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.EntityWithServiceClass;
import com.mycompany.myapp.repository.EntityWithServiceClassRepository;
import com.mycompany.myapp.repository.search.EntityWithServiceClassSearchRepository;
import com.mycompany.myapp.service.EntityWithServiceClassService;
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
 * Test class for the EntityWithServiceClassResource REST controller.
 *
 * @see EntityWithServiceClassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class EntityWithServiceClassResourceIntTest {

    private static final String DEFAULT_ZOE = "AAAAAAAAAA";
    private static final String UPDATED_ZOE = "BBBBBBBBBB";

    @Autowired
    private EntityWithServiceClassRepository entityWithServiceClassRepository;
    
    @Autowired
    private EntityWithServiceClassService entityWithServiceClassService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.EntityWithServiceClassSearchRepositoryMockConfiguration
     */
    @Autowired
    private EntityWithServiceClassSearchRepository mockEntityWithServiceClassSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEntityWithServiceClassMockMvc;

    private EntityWithServiceClass entityWithServiceClass;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntityWithServiceClassResource entityWithServiceClassResource = new EntityWithServiceClassResource(entityWithServiceClassService);
        this.restEntityWithServiceClassMockMvc = MockMvcBuilders.standaloneSetup(entityWithServiceClassResource)
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
    public static EntityWithServiceClass createEntity(EntityManager em) {
        EntityWithServiceClass entityWithServiceClass = new EntityWithServiceClass()
            .zoe(DEFAULT_ZOE);
        return entityWithServiceClass;
    }

    @Before
    public void initTest() {
        entityWithServiceClass = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntityWithServiceClass() throws Exception {
        int databaseSizeBeforeCreate = entityWithServiceClassRepository.findAll().size();

        // Create the EntityWithServiceClass
        restEntityWithServiceClassMockMvc.perform(post("/api/entity-with-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceClass)))
            .andExpect(status().isCreated());

        // Validate the EntityWithServiceClass in the database
        List<EntityWithServiceClass> entityWithServiceClassList = entityWithServiceClassRepository.findAll();
        assertThat(entityWithServiceClassList).hasSize(databaseSizeBeforeCreate + 1);
        EntityWithServiceClass testEntityWithServiceClass = entityWithServiceClassList.get(entityWithServiceClassList.size() - 1);
        assertThat(testEntityWithServiceClass.getZoe()).isEqualTo(DEFAULT_ZOE);

        // Validate the EntityWithServiceClass in Elasticsearch
        verify(mockEntityWithServiceClassSearchRepository, times(1)).save(testEntityWithServiceClass);
    }

    @Test
    @Transactional
    public void createEntityWithServiceClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entityWithServiceClassRepository.findAll().size();

        // Create the EntityWithServiceClass with an existing ID
        entityWithServiceClass.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntityWithServiceClassMockMvc.perform(post("/api/entity-with-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceClass)))
            .andExpect(status().isBadRequest());

        // Validate the EntityWithServiceClass in the database
        List<EntityWithServiceClass> entityWithServiceClassList = entityWithServiceClassRepository.findAll();
        assertThat(entityWithServiceClassList).hasSize(databaseSizeBeforeCreate);

        // Validate the EntityWithServiceClass in Elasticsearch
        verify(mockEntityWithServiceClassSearchRepository, times(0)).save(entityWithServiceClass);
    }

    @Test
    @Transactional
    public void getAllEntityWithServiceClasses() throws Exception {
        // Initialize the database
        entityWithServiceClassRepository.saveAndFlush(entityWithServiceClass);

        // Get all the entityWithServiceClassList
        restEntityWithServiceClassMockMvc.perform(get("/api/entity-with-service-classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entityWithServiceClass.getId().intValue())))
            .andExpect(jsonPath("$.[*].zoe").value(hasItem(DEFAULT_ZOE.toString())));
    }
    
    @Test
    @Transactional
    public void getEntityWithServiceClass() throws Exception {
        // Initialize the database
        entityWithServiceClassRepository.saveAndFlush(entityWithServiceClass);

        // Get the entityWithServiceClass
        restEntityWithServiceClassMockMvc.perform(get("/api/entity-with-service-classes/{id}", entityWithServiceClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entityWithServiceClass.getId().intValue()))
            .andExpect(jsonPath("$.zoe").value(DEFAULT_ZOE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntityWithServiceClass() throws Exception {
        // Get the entityWithServiceClass
        restEntityWithServiceClassMockMvc.perform(get("/api/entity-with-service-classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntityWithServiceClass() throws Exception {
        // Initialize the database
        entityWithServiceClassService.save(entityWithServiceClass);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockEntityWithServiceClassSearchRepository);

        int databaseSizeBeforeUpdate = entityWithServiceClassRepository.findAll().size();

        // Update the entityWithServiceClass
        EntityWithServiceClass updatedEntityWithServiceClass = entityWithServiceClassRepository.findById(entityWithServiceClass.getId()).get();
        // Disconnect from session so that the updates on updatedEntityWithServiceClass are not directly saved in db
        em.detach(updatedEntityWithServiceClass);
        updatedEntityWithServiceClass
            .zoe(UPDATED_ZOE);

        restEntityWithServiceClassMockMvc.perform(put("/api/entity-with-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntityWithServiceClass)))
            .andExpect(status().isOk());

        // Validate the EntityWithServiceClass in the database
        List<EntityWithServiceClass> entityWithServiceClassList = entityWithServiceClassRepository.findAll();
        assertThat(entityWithServiceClassList).hasSize(databaseSizeBeforeUpdate);
        EntityWithServiceClass testEntityWithServiceClass = entityWithServiceClassList.get(entityWithServiceClassList.size() - 1);
        assertThat(testEntityWithServiceClass.getZoe()).isEqualTo(UPDATED_ZOE);

        // Validate the EntityWithServiceClass in Elasticsearch
        verify(mockEntityWithServiceClassSearchRepository, times(1)).save(testEntityWithServiceClass);
    }

    @Test
    @Transactional
    public void updateNonExistingEntityWithServiceClass() throws Exception {
        int databaseSizeBeforeUpdate = entityWithServiceClassRepository.findAll().size();

        // Create the EntityWithServiceClass

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntityWithServiceClassMockMvc.perform(put("/api/entity-with-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entityWithServiceClass)))
            .andExpect(status().isBadRequest());

        // Validate the EntityWithServiceClass in the database
        List<EntityWithServiceClass> entityWithServiceClassList = entityWithServiceClassRepository.findAll();
        assertThat(entityWithServiceClassList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EntityWithServiceClass in Elasticsearch
        verify(mockEntityWithServiceClassSearchRepository, times(0)).save(entityWithServiceClass);
    }

    @Test
    @Transactional
    public void deleteEntityWithServiceClass() throws Exception {
        // Initialize the database
        entityWithServiceClassService.save(entityWithServiceClass);

        int databaseSizeBeforeDelete = entityWithServiceClassRepository.findAll().size();

        // Get the entityWithServiceClass
        restEntityWithServiceClassMockMvc.perform(delete("/api/entity-with-service-classes/{id}", entityWithServiceClass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EntityWithServiceClass> entityWithServiceClassList = entityWithServiceClassRepository.findAll();
        assertThat(entityWithServiceClassList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EntityWithServiceClass in Elasticsearch
        verify(mockEntityWithServiceClassSearchRepository, times(1)).deleteById(entityWithServiceClass.getId());
    }

    @Test
    @Transactional
    public void searchEntityWithServiceClass() throws Exception {
        // Initialize the database
        entityWithServiceClassService.save(entityWithServiceClass);
        when(mockEntityWithServiceClassSearchRepository.search(queryStringQuery("id:" + entityWithServiceClass.getId())))
            .thenReturn(Collections.singletonList(entityWithServiceClass));
        // Search the entityWithServiceClass
        restEntityWithServiceClassMockMvc.perform(get("/api/_search/entity-with-service-classes?query=id:" + entityWithServiceClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entityWithServiceClass.getId().intValue())))
            .andExpect(jsonPath("$.[*].zoe").value(hasItem(DEFAULT_ZOE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntityWithServiceClass.class);
        EntityWithServiceClass entityWithServiceClass1 = new EntityWithServiceClass();
        entityWithServiceClass1.setId(1L);
        EntityWithServiceClass entityWithServiceClass2 = new EntityWithServiceClass();
        entityWithServiceClass2.setId(entityWithServiceClass1.getId());
        assertThat(entityWithServiceClass1).isEqualTo(entityWithServiceClass2);
        entityWithServiceClass2.setId(2L);
        assertThat(entityWithServiceClass1).isNotEqualTo(entityWithServiceClass2);
        entityWithServiceClass1.setId(null);
        assertThat(entityWithServiceClass1).isNotEqualTo(entityWithServiceClass2);
    }
}
