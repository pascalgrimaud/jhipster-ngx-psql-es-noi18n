package com.mycompany.myapp.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.mycompany.myapp.domain.TestServiceImpl;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.TestServiceImplRepository;
import com.mycompany.myapp.repository.search.TestServiceImplSearchRepository;
import com.mycompany.myapp.service.dto.TestServiceImplCriteria;

/**
 * Service for executing complex queries for TestServiceImpl entities in the database.
 * The main input is a {@link TestServiceImplCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TestServiceImpl} or a {@link Page} of {@link TestServiceImpl} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TestServiceImplQueryService extends QueryService<TestServiceImpl> {

    private final Logger log = LoggerFactory.getLogger(TestServiceImplQueryService.class);

    private final TestServiceImplRepository testServiceImplRepository;

    private final TestServiceImplSearchRepository testServiceImplSearchRepository;

    public TestServiceImplQueryService(TestServiceImplRepository testServiceImplRepository, TestServiceImplSearchRepository testServiceImplSearchRepository) {
        this.testServiceImplRepository = testServiceImplRepository;
        this.testServiceImplSearchRepository = testServiceImplSearchRepository;
    }

    /**
     * Return a {@link List} of {@link TestServiceImpl} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TestServiceImpl> findByCriteria(TestServiceImplCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TestServiceImpl> specification = createSpecification(criteria);
        return testServiceImplRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TestServiceImpl} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TestServiceImpl> findByCriteria(TestServiceImplCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TestServiceImpl> specification = createSpecification(criteria);
        return testServiceImplRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TestServiceImplCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TestServiceImpl> specification = createSpecification(criteria);
        return testServiceImplRepository.count(specification);
    }

    /**
     * Function to convert TestServiceImplCriteria to a {@link Specification}
     */
    private Specification<TestServiceImpl> createSpecification(TestServiceImplCriteria criteria) {
        Specification<TestServiceImpl> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), TestServiceImpl_.id));
            }
            if (criteria.getTestManyToOneId() != null) {
                specification = specification.and(buildSpecification(criteria.getTestManyToOneId(),
                    root -> root.join(TestServiceImpl_.testManyToOnes, JoinType.LEFT).get(TestManyToOne_.id)));
            }
            if (criteria.getTestManyToManyId() != null) {
                specification = specification.and(buildSpecification(criteria.getTestManyToManyId(),
                    root -> root.join(TestServiceImpl_.testManyToManies, JoinType.LEFT).get(TestManyToMany_.id)));
            }
            if (criteria.getTestOneToOneId() != null) {
                specification = specification.and(buildSpecification(criteria.getTestOneToOneId(),
                    root -> root.join(TestServiceImpl_.testOneToOne, JoinType.LEFT).get(TestOneToOne_.id)));
            }
            if (criteria.getUserOneToManyId() != null) {
                specification = specification.and(buildSpecification(criteria.getUserOneToManyId(),
                    root -> root.join(TestServiceImpl_.userOneToMany, JoinType.LEFT).get(User_.id)));
            }
            if (criteria.getUserManyToManyId() != null) {
                specification = specification.and(buildSpecification(criteria.getUserManyToManyId(),
                    root -> root.join(TestServiceImpl_.userManyToManies, JoinType.LEFT).get(User_.id)));
            }
            if (criteria.getUserOneToOneId() != null) {
                specification = specification.and(buildSpecification(criteria.getUserOneToOneId(),
                    root -> root.join(TestServiceImpl_.userOneToOne, JoinType.LEFT).get(User_.id)));
            }
        }
        return specification;
    }
}
