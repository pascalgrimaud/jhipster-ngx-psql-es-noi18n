package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestServiceClass;
import com.mycompany.myapp.domain.TestManyToOne;
import com.mycompany.myapp.domain.TestManyToMany;
import com.mycompany.myapp.domain.TestOneToOne;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.TestServiceClassRepository;
import com.mycompany.myapp.repository.search.TestServiceClassSearchRepository;
import com.mycompany.myapp.service.TestServiceClassService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;
import com.mycompany.myapp.service.dto.TestServiceClassCriteria;
import com.mycompany.myapp.service.TestServiceClassQueryService;

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
 * Test class for the TestServiceClassResource REST controller.
 *
 * @see TestServiceClassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestServiceClassResourceIntTest {

    @Autowired
    private TestServiceClassRepository testServiceClassRepository;

    @Mock
    private TestServiceClassRepository testServiceClassRepositoryMock;
    

    @Mock
    private TestServiceClassService testServiceClassServiceMock;

    @Autowired
    private TestServiceClassService testServiceClassService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestServiceClassSearchRepositoryMockConfiguration
     */
    @Autowired
    private TestServiceClassSearchRepository mockTestServiceClassSearchRepository;

    @Autowired
    private TestServiceClassQueryService testServiceClassQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestServiceClassMockMvc;

    private TestServiceClass testServiceClass;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestServiceClassResource testServiceClassResource = new TestServiceClassResource(testServiceClassService, testServiceClassQueryService);
        this.restTestServiceClassMockMvc = MockMvcBuilders.standaloneSetup(testServiceClassResource)
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
    public static TestServiceClass createEntity(EntityManager em) {
        TestServiceClass testServiceClass = new TestServiceClass();
        return testServiceClass;
    }

    @Before
    public void initTest() {
        testServiceClass = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestServiceClass() throws Exception {
        int databaseSizeBeforeCreate = testServiceClassRepository.findAll().size();

        // Create the TestServiceClass
        restTestServiceClassMockMvc.perform(post("/api/test-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceClass)))
            .andExpect(status().isCreated());

        // Validate the TestServiceClass in the database
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeCreate + 1);
        TestServiceClass testTestServiceClass = testServiceClassList.get(testServiceClassList.size() - 1);

        // Validate the TestServiceClass in Elasticsearch
        verify(mockTestServiceClassSearchRepository, times(1)).save(testTestServiceClass);
    }

    @Test
    @Transactional
    public void createTestServiceClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testServiceClassRepository.findAll().size();

        // Create the TestServiceClass with an existing ID
        testServiceClass.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestServiceClassMockMvc.perform(post("/api/test-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceClass)))
            .andExpect(status().isBadRequest());

        // Validate the TestServiceClass in the database
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestServiceClass in Elasticsearch
        verify(mockTestServiceClassSearchRepository, times(0)).save(testServiceClass);
    }

    @Test
    @Transactional
    public void getAllTestServiceClasses() throws Exception {
        // Initialize the database
        testServiceClassRepository.saveAndFlush(testServiceClass);

        // Get all the testServiceClassList
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testServiceClass.getId().intValue())));
    }
    
    public void getAllTestServiceClassesWithEagerRelationshipsIsEnabled() throws Exception {
        TestServiceClassResource testServiceClassResource = new TestServiceClassResource(testServiceClassServiceMock, testServiceClassQueryService);
        when(testServiceClassServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTestServiceClassMockMvc = MockMvcBuilders.standaloneSetup(testServiceClassResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestServiceClassMockMvc.perform(get("/api/test-service-classes?eagerload=true"))
        .andExpect(status().isOk());

        verify(testServiceClassServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTestServiceClassesWithEagerRelationshipsIsNotEnabled() throws Exception {
        TestServiceClassResource testServiceClassResource = new TestServiceClassResource(testServiceClassServiceMock, testServiceClassQueryService);
            when(testServiceClassServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTestServiceClassMockMvc = MockMvcBuilders.standaloneSetup(testServiceClassResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestServiceClassMockMvc.perform(get("/api/test-service-classes?eagerload=true"))
        .andExpect(status().isOk());

            verify(testServiceClassServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTestServiceClass() throws Exception {
        // Initialize the database
        testServiceClassRepository.saveAndFlush(testServiceClass);

        // Get the testServiceClass
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes/{id}", testServiceClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testServiceClass.getId().intValue()));
    }

    @Test
    @Transactional
    public void getAllTestServiceClassesByTestManyToOneIsEqualToSomething() throws Exception {
        // Initialize the database
        TestManyToOne testManyToOne = TestManyToOneResourceIntTest.createEntity(em);
        em.persist(testManyToOne);
        em.flush();
        testServiceClass.addTestManyToOne(testManyToOne);
        testServiceClassRepository.saveAndFlush(testServiceClass);
        Long testManyToOneId = testManyToOne.getId();

        // Get all the testServiceClassList where testManyToOne equals to testManyToOneId
        defaultTestServiceClassShouldBeFound("testManyToOneId.equals=" + testManyToOneId);

        // Get all the testServiceClassList where testManyToOne equals to testManyToOneId + 1
        defaultTestServiceClassShouldNotBeFound("testManyToOneId.equals=" + (testManyToOneId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceClassesByTestManyToManyIsEqualToSomething() throws Exception {
        // Initialize the database
        TestManyToMany testManyToMany = TestManyToManyResourceIntTest.createEntity(em);
        em.persist(testManyToMany);
        em.flush();
        testServiceClass.addTestManyToMany(testManyToMany);
        testServiceClassRepository.saveAndFlush(testServiceClass);
        Long testManyToManyId = testManyToMany.getId();

        // Get all the testServiceClassList where testManyToMany equals to testManyToManyId
        defaultTestServiceClassShouldBeFound("testManyToManyId.equals=" + testManyToManyId);

        // Get all the testServiceClassList where testManyToMany equals to testManyToManyId + 1
        defaultTestServiceClassShouldNotBeFound("testManyToManyId.equals=" + (testManyToManyId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceClassesByTestOneToOneIsEqualToSomething() throws Exception {
        // Initialize the database
        TestOneToOne testOneToOne = TestOneToOneResourceIntTest.createEntity(em);
        em.persist(testOneToOne);
        em.flush();
        testServiceClass.setTestOneToOne(testOneToOne);
        testOneToOne.setTestServiceClass(testServiceClass);
        testServiceClassRepository.saveAndFlush(testServiceClass);
        Long testOneToOneId = testOneToOne.getId();

        // Get all the testServiceClassList where testOneToOne equals to testOneToOneId
        defaultTestServiceClassShouldBeFound("testOneToOneId.equals=" + testOneToOneId);

        // Get all the testServiceClassList where testOneToOne equals to testOneToOneId + 1
        defaultTestServiceClassShouldNotBeFound("testOneToOneId.equals=" + (testOneToOneId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceClassesByUserOneToManyIsEqualToSomething() throws Exception {
        // Initialize the database
        User userOneToMany = UserResourceIntTest.createEntity(em);
        em.persist(userOneToMany);
        em.flush();
        testServiceClass.setUserOneToMany(userOneToMany);
        testServiceClassRepository.saveAndFlush(testServiceClass);
        Long userOneToManyId = userOneToMany.getId();

        // Get all the testServiceClassList where userOneToMany equals to userOneToManyId
        defaultTestServiceClassShouldBeFound("userOneToManyId.equals=" + userOneToManyId);

        // Get all the testServiceClassList where userOneToMany equals to userOneToManyId + 1
        defaultTestServiceClassShouldNotBeFound("userOneToManyId.equals=" + (userOneToManyId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceClassesByUserManyToManyIsEqualToSomething() throws Exception {
        // Initialize the database
        User userManyToMany = UserResourceIntTest.createEntity(em);
        em.persist(userManyToMany);
        em.flush();
        testServiceClass.addUserManyToMany(userManyToMany);
        testServiceClassRepository.saveAndFlush(testServiceClass);
        Long userManyToManyId = userManyToMany.getId();

        // Get all the testServiceClassList where userManyToMany equals to userManyToManyId
        defaultTestServiceClassShouldBeFound("userManyToManyId.equals=" + userManyToManyId);

        // Get all the testServiceClassList where userManyToMany equals to userManyToManyId + 1
        defaultTestServiceClassShouldNotBeFound("userManyToManyId.equals=" + (userManyToManyId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceClassesByUserOneToOneIsEqualToSomething() throws Exception {
        // Initialize the database
        User userOneToOne = UserResourceIntTest.createEntity(em);
        em.persist(userOneToOne);
        em.flush();
        testServiceClass.setUserOneToOne(userOneToOne);
        testServiceClassRepository.saveAndFlush(testServiceClass);
        Long userOneToOneId = userOneToOne.getId();

        // Get all the testServiceClassList where userOneToOne equals to userOneToOneId
        defaultTestServiceClassShouldBeFound("userOneToOneId.equals=" + userOneToOneId);

        // Get all the testServiceClassList where userOneToOne equals to userOneToOneId + 1
        defaultTestServiceClassShouldNotBeFound("userOneToOneId.equals=" + (userOneToOneId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultTestServiceClassShouldBeFound(String filter) throws Exception {
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testServiceClass.getId().intValue())));

        // Check, that the count call also returns 1
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultTestServiceClassShouldNotBeFound(String filter) throws Exception {
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingTestServiceClass() throws Exception {
        // Get the testServiceClass
        restTestServiceClassMockMvc.perform(get("/api/test-service-classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestServiceClass() throws Exception {
        // Initialize the database
        testServiceClassService.save(testServiceClass);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTestServiceClassSearchRepository);

        int databaseSizeBeforeUpdate = testServiceClassRepository.findAll().size();

        // Update the testServiceClass
        TestServiceClass updatedTestServiceClass = testServiceClassRepository.findById(testServiceClass.getId()).get();
        // Disconnect from session so that the updates on updatedTestServiceClass are not directly saved in db
        em.detach(updatedTestServiceClass);

        restTestServiceClassMockMvc.perform(put("/api/test-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestServiceClass)))
            .andExpect(status().isOk());

        // Validate the TestServiceClass in the database
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeUpdate);
        TestServiceClass testTestServiceClass = testServiceClassList.get(testServiceClassList.size() - 1);

        // Validate the TestServiceClass in Elasticsearch
        verify(mockTestServiceClassSearchRepository, times(1)).save(testTestServiceClass);
    }

    @Test
    @Transactional
    public void updateNonExistingTestServiceClass() throws Exception {
        int databaseSizeBeforeUpdate = testServiceClassRepository.findAll().size();

        // Create the TestServiceClass

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestServiceClassMockMvc.perform(put("/api/test-service-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceClass)))
            .andExpect(status().isBadRequest());

        // Validate the TestServiceClass in the database
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestServiceClass in Elasticsearch
        verify(mockTestServiceClassSearchRepository, times(0)).save(testServiceClass);
    }

    @Test
    @Transactional
    public void deleteTestServiceClass() throws Exception {
        // Initialize the database
        testServiceClassService.save(testServiceClass);

        int databaseSizeBeforeDelete = testServiceClassRepository.findAll().size();

        // Get the testServiceClass
        restTestServiceClassMockMvc.perform(delete("/api/test-service-classes/{id}", testServiceClass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestServiceClass> testServiceClassList = testServiceClassRepository.findAll();
        assertThat(testServiceClassList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestServiceClass in Elasticsearch
        verify(mockTestServiceClassSearchRepository, times(1)).deleteById(testServiceClass.getId());
    }

    @Test
    @Transactional
    public void searchTestServiceClass() throws Exception {
        // Initialize the database
        testServiceClassService.save(testServiceClass);
        when(mockTestServiceClassSearchRepository.search(queryStringQuery("id:" + testServiceClass.getId())))
            .thenReturn(Collections.singletonList(testServiceClass));
        // Search the testServiceClass
        restTestServiceClassMockMvc.perform(get("/api/_search/test-service-classes?query=id:" + testServiceClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testServiceClass.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestServiceClass.class);
        TestServiceClass testServiceClass1 = new TestServiceClass();
        testServiceClass1.setId(1L);
        TestServiceClass testServiceClass2 = new TestServiceClass();
        testServiceClass2.setId(testServiceClass1.getId());
        assertThat(testServiceClass1).isEqualTo(testServiceClass2);
        testServiceClass2.setId(2L);
        assertThat(testServiceClass1).isNotEqualTo(testServiceClass2);
        testServiceClass1.setId(null);
        assertThat(testServiceClass1).isNotEqualTo(testServiceClass2);
    }
}
