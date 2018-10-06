package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.TestServiceImpl;
import com.mycompany.myapp.domain.TestManyToOne;
import com.mycompany.myapp.domain.TestManyToMany;
import com.mycompany.myapp.domain.TestOneToOne;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.TestServiceImplRepository;
import com.mycompany.myapp.repository.search.TestServiceImplSearchRepository;
import com.mycompany.myapp.service.TestServiceImplService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;
import com.mycompany.myapp.service.dto.TestServiceImplCriteria;
import com.mycompany.myapp.service.TestServiceImplQueryService;

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
 * Test class for the TestServiceImplResource REST controller.
 *
 * @see TestServiceImplResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class TestServiceImplResourceIntTest {

    @Autowired
    private TestServiceImplRepository testServiceImplRepository;

    @Mock
    private TestServiceImplRepository testServiceImplRepositoryMock;
    

    @Mock
    private TestServiceImplService testServiceImplServiceMock;

    @Autowired
    private TestServiceImplService testServiceImplService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.TestServiceImplSearchRepositoryMockConfiguration
     */
    @Autowired
    private TestServiceImplSearchRepository mockTestServiceImplSearchRepository;

    @Autowired
    private TestServiceImplQueryService testServiceImplQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestServiceImplMockMvc;

    private TestServiceImpl testServiceImpl;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestServiceImplResource testServiceImplResource = new TestServiceImplResource(testServiceImplService, testServiceImplQueryService);
        this.restTestServiceImplMockMvc = MockMvcBuilders.standaloneSetup(testServiceImplResource)
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
    public static TestServiceImpl createEntity(EntityManager em) {
        TestServiceImpl testServiceImpl = new TestServiceImpl();
        return testServiceImpl;
    }

    @Before
    public void initTest() {
        testServiceImpl = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestServiceImpl() throws Exception {
        int databaseSizeBeforeCreate = testServiceImplRepository.findAll().size();

        // Create the TestServiceImpl
        restTestServiceImplMockMvc.perform(post("/api/test-service-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceImpl)))
            .andExpect(status().isCreated());

        // Validate the TestServiceImpl in the database
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeCreate + 1);
        TestServiceImpl testTestServiceImpl = testServiceImplList.get(testServiceImplList.size() - 1);

        // Validate the TestServiceImpl in Elasticsearch
        verify(mockTestServiceImplSearchRepository, times(1)).save(testTestServiceImpl);
    }

    @Test
    @Transactional
    public void createTestServiceImplWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testServiceImplRepository.findAll().size();

        // Create the TestServiceImpl with an existing ID
        testServiceImpl.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestServiceImplMockMvc.perform(post("/api/test-service-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceImpl)))
            .andExpect(status().isBadRequest());

        // Validate the TestServiceImpl in the database
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeCreate);

        // Validate the TestServiceImpl in Elasticsearch
        verify(mockTestServiceImplSearchRepository, times(0)).save(testServiceImpl);
    }

    @Test
    @Transactional
    public void getAllTestServiceImpls() throws Exception {
        // Initialize the database
        testServiceImplRepository.saveAndFlush(testServiceImpl);

        // Get all the testServiceImplList
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testServiceImpl.getId().intValue())));
    }
    
    public void getAllTestServiceImplsWithEagerRelationshipsIsEnabled() throws Exception {
        TestServiceImplResource testServiceImplResource = new TestServiceImplResource(testServiceImplServiceMock, testServiceImplQueryService);
        when(testServiceImplServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTestServiceImplMockMvc = MockMvcBuilders.standaloneSetup(testServiceImplResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestServiceImplMockMvc.perform(get("/api/test-service-impls?eagerload=true"))
        .andExpect(status().isOk());

        verify(testServiceImplServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTestServiceImplsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TestServiceImplResource testServiceImplResource = new TestServiceImplResource(testServiceImplServiceMock, testServiceImplQueryService);
            when(testServiceImplServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTestServiceImplMockMvc = MockMvcBuilders.standaloneSetup(testServiceImplResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTestServiceImplMockMvc.perform(get("/api/test-service-impls?eagerload=true"))
        .andExpect(status().isOk());

            verify(testServiceImplServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTestServiceImpl() throws Exception {
        // Initialize the database
        testServiceImplRepository.saveAndFlush(testServiceImpl);

        // Get the testServiceImpl
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls/{id}", testServiceImpl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testServiceImpl.getId().intValue()));
    }

    @Test
    @Transactional
    public void getAllTestServiceImplsByTestManyToOneIsEqualToSomething() throws Exception {
        // Initialize the database
        TestManyToOne testManyToOne = TestManyToOneResourceIntTest.createEntity(em);
        em.persist(testManyToOne);
        em.flush();
        testServiceImpl.addTestManyToOne(testManyToOne);
        testServiceImplRepository.saveAndFlush(testServiceImpl);
        Long testManyToOneId = testManyToOne.getId();

        // Get all the testServiceImplList where testManyToOne equals to testManyToOneId
        defaultTestServiceImplShouldBeFound("testManyToOneId.equals=" + testManyToOneId);

        // Get all the testServiceImplList where testManyToOne equals to testManyToOneId + 1
        defaultTestServiceImplShouldNotBeFound("testManyToOneId.equals=" + (testManyToOneId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceImplsByTestManyToManyIsEqualToSomething() throws Exception {
        // Initialize the database
        TestManyToMany testManyToMany = TestManyToManyResourceIntTest.createEntity(em);
        em.persist(testManyToMany);
        em.flush();
        testServiceImpl.addTestManyToMany(testManyToMany);
        testServiceImplRepository.saveAndFlush(testServiceImpl);
        Long testManyToManyId = testManyToMany.getId();

        // Get all the testServiceImplList where testManyToMany equals to testManyToManyId
        defaultTestServiceImplShouldBeFound("testManyToManyId.equals=" + testManyToManyId);

        // Get all the testServiceImplList where testManyToMany equals to testManyToManyId + 1
        defaultTestServiceImplShouldNotBeFound("testManyToManyId.equals=" + (testManyToManyId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceImplsByTestOneToOneIsEqualToSomething() throws Exception {
        // Initialize the database
        TestOneToOne testOneToOne = TestOneToOneResourceIntTest.createEntity(em);
        em.persist(testOneToOne);
        em.flush();
        testServiceImpl.setTestOneToOne(testOneToOne);
        testOneToOne.setTestServiceImpl(testServiceImpl);
        testServiceImplRepository.saveAndFlush(testServiceImpl);
        Long testOneToOneId = testOneToOne.getId();

        // Get all the testServiceImplList where testOneToOne equals to testOneToOneId
        defaultTestServiceImplShouldBeFound("testOneToOneId.equals=" + testOneToOneId);

        // Get all the testServiceImplList where testOneToOne equals to testOneToOneId + 1
        defaultTestServiceImplShouldNotBeFound("testOneToOneId.equals=" + (testOneToOneId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceImplsByUserOneToManyIsEqualToSomething() throws Exception {
        // Initialize the database
        User userOneToMany = UserResourceIntTest.createEntity(em);
        em.persist(userOneToMany);
        em.flush();
        testServiceImpl.setUserOneToMany(userOneToMany);
        testServiceImplRepository.saveAndFlush(testServiceImpl);
        Long userOneToManyId = userOneToMany.getId();

        // Get all the testServiceImplList where userOneToMany equals to userOneToManyId
        defaultTestServiceImplShouldBeFound("userOneToManyId.equals=" + userOneToManyId);

        // Get all the testServiceImplList where userOneToMany equals to userOneToManyId + 1
        defaultTestServiceImplShouldNotBeFound("userOneToManyId.equals=" + (userOneToManyId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceImplsByUserManyToManyIsEqualToSomething() throws Exception {
        // Initialize the database
        User userManyToMany = UserResourceIntTest.createEntity(em);
        em.persist(userManyToMany);
        em.flush();
        testServiceImpl.addUserManyToMany(userManyToMany);
        testServiceImplRepository.saveAndFlush(testServiceImpl);
        Long userManyToManyId = userManyToMany.getId();

        // Get all the testServiceImplList where userManyToMany equals to userManyToManyId
        defaultTestServiceImplShouldBeFound("userManyToManyId.equals=" + userManyToManyId);

        // Get all the testServiceImplList where userManyToMany equals to userManyToManyId + 1
        defaultTestServiceImplShouldNotBeFound("userManyToManyId.equals=" + (userManyToManyId + 1));
    }


    @Test
    @Transactional
    public void getAllTestServiceImplsByUserOneToOneIsEqualToSomething() throws Exception {
        // Initialize the database
        User userOneToOne = UserResourceIntTest.createEntity(em);
        em.persist(userOneToOne);
        em.flush();
        testServiceImpl.setUserOneToOne(userOneToOne);
        testServiceImplRepository.saveAndFlush(testServiceImpl);
        Long userOneToOneId = userOneToOne.getId();

        // Get all the testServiceImplList where userOneToOne equals to userOneToOneId
        defaultTestServiceImplShouldBeFound("userOneToOneId.equals=" + userOneToOneId);

        // Get all the testServiceImplList where userOneToOne equals to userOneToOneId + 1
        defaultTestServiceImplShouldNotBeFound("userOneToOneId.equals=" + (userOneToOneId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultTestServiceImplShouldBeFound(String filter) throws Exception {
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testServiceImpl.getId().intValue())));

        // Check, that the count call also returns 1
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultTestServiceImplShouldNotBeFound(String filter) throws Exception {
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingTestServiceImpl() throws Exception {
        // Get the testServiceImpl
        restTestServiceImplMockMvc.perform(get("/api/test-service-impls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestServiceImpl() throws Exception {
        // Initialize the database
        testServiceImplService.save(testServiceImpl);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTestServiceImplSearchRepository);

        int databaseSizeBeforeUpdate = testServiceImplRepository.findAll().size();

        // Update the testServiceImpl
        TestServiceImpl updatedTestServiceImpl = testServiceImplRepository.findById(testServiceImpl.getId()).get();
        // Disconnect from session so that the updates on updatedTestServiceImpl are not directly saved in db
        em.detach(updatedTestServiceImpl);

        restTestServiceImplMockMvc.perform(put("/api/test-service-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestServiceImpl)))
            .andExpect(status().isOk());

        // Validate the TestServiceImpl in the database
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeUpdate);
        TestServiceImpl testTestServiceImpl = testServiceImplList.get(testServiceImplList.size() - 1);

        // Validate the TestServiceImpl in Elasticsearch
        verify(mockTestServiceImplSearchRepository, times(1)).save(testTestServiceImpl);
    }

    @Test
    @Transactional
    public void updateNonExistingTestServiceImpl() throws Exception {
        int databaseSizeBeforeUpdate = testServiceImplRepository.findAll().size();

        // Create the TestServiceImpl

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestServiceImplMockMvc.perform(put("/api/test-service-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testServiceImpl)))
            .andExpect(status().isBadRequest());

        // Validate the TestServiceImpl in the database
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TestServiceImpl in Elasticsearch
        verify(mockTestServiceImplSearchRepository, times(0)).save(testServiceImpl);
    }

    @Test
    @Transactional
    public void deleteTestServiceImpl() throws Exception {
        // Initialize the database
        testServiceImplService.save(testServiceImpl);

        int databaseSizeBeforeDelete = testServiceImplRepository.findAll().size();

        // Get the testServiceImpl
        restTestServiceImplMockMvc.perform(delete("/api/test-service-impls/{id}", testServiceImpl.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestServiceImpl> testServiceImplList = testServiceImplRepository.findAll();
        assertThat(testServiceImplList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TestServiceImpl in Elasticsearch
        verify(mockTestServiceImplSearchRepository, times(1)).deleteById(testServiceImpl.getId());
    }

    @Test
    @Transactional
    public void searchTestServiceImpl() throws Exception {
        // Initialize the database
        testServiceImplService.save(testServiceImpl);
        when(mockTestServiceImplSearchRepository.search(queryStringQuery("id:" + testServiceImpl.getId())))
            .thenReturn(Collections.singletonList(testServiceImpl));
        // Search the testServiceImpl
        restTestServiceImplMockMvc.perform(get("/api/_search/test-service-impls?query=id:" + testServiceImpl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testServiceImpl.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestServiceImpl.class);
        TestServiceImpl testServiceImpl1 = new TestServiceImpl();
        testServiceImpl1.setId(1L);
        TestServiceImpl testServiceImpl2 = new TestServiceImpl();
        testServiceImpl2.setId(testServiceImpl1.getId());
        assertThat(testServiceImpl1).isEqualTo(testServiceImpl2);
        testServiceImpl2.setId(2L);
        assertThat(testServiceImpl1).isNotEqualTo(testServiceImpl2);
        testServiceImpl1.setId(null);
        assertThat(testServiceImpl1).isNotEqualTo(testServiceImpl2);
    }
}
