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

import com.mycompany.myapp.domain.FieldTestServiceClassEntity;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.FieldTestServiceClassEntityRepository;
import com.mycompany.myapp.repository.search.FieldTestServiceClassEntitySearchRepository;
import com.mycompany.myapp.service.dto.FieldTestServiceClassEntityCriteria;

/**
 * Service for executing complex queries for FieldTestServiceClassEntity entities in the database.
 * The main input is a {@link FieldTestServiceClassEntityCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link FieldTestServiceClassEntity} or a {@link Page} of {@link FieldTestServiceClassEntity} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class FieldTestServiceClassEntityQueryService extends QueryService<FieldTestServiceClassEntity> {

    private final Logger log = LoggerFactory.getLogger(FieldTestServiceClassEntityQueryService.class);

    private final FieldTestServiceClassEntityRepository fieldTestServiceClassEntityRepository;

    private final FieldTestServiceClassEntitySearchRepository fieldTestServiceClassEntitySearchRepository;

    public FieldTestServiceClassEntityQueryService(FieldTestServiceClassEntityRepository fieldTestServiceClassEntityRepository, FieldTestServiceClassEntitySearchRepository fieldTestServiceClassEntitySearchRepository) {
        this.fieldTestServiceClassEntityRepository = fieldTestServiceClassEntityRepository;
        this.fieldTestServiceClassEntitySearchRepository = fieldTestServiceClassEntitySearchRepository;
    }

    /**
     * Return a {@link List} of {@link FieldTestServiceClassEntity} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<FieldTestServiceClassEntity> findByCriteria(FieldTestServiceClassEntityCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<FieldTestServiceClassEntity> specification = createSpecification(criteria);
        return fieldTestServiceClassEntityRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link FieldTestServiceClassEntity} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<FieldTestServiceClassEntity> findByCriteria(FieldTestServiceClassEntityCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<FieldTestServiceClassEntity> specification = createSpecification(criteria);
        return fieldTestServiceClassEntityRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(FieldTestServiceClassEntityCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<FieldTestServiceClassEntity> specification = createSpecification(criteria);
        return fieldTestServiceClassEntityRepository.count(specification);
    }

    /**
     * Function to convert FieldTestServiceClassEntityCriteria to a {@link Specification}
     */
    private Specification<FieldTestServiceClassEntity> createSpecification(FieldTestServiceClassEntityCriteria criteria) {
        Specification<FieldTestServiceClassEntity> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), FieldTestServiceClassEntity_.id));
            }
            if (criteria.getStringBob() != null) {
                specification = specification.and(buildStringSpecification(criteria.getStringBob(), FieldTestServiceClassEntity_.stringBob));
            }
            if (criteria.getStringRequiredBob() != null) {
                specification = specification.and(buildStringSpecification(criteria.getStringRequiredBob(), FieldTestServiceClassEntity_.stringRequiredBob));
            }
            if (criteria.getStringMinlengthBob() != null) {
                specification = specification.and(buildStringSpecification(criteria.getStringMinlengthBob(), FieldTestServiceClassEntity_.stringMinlengthBob));
            }
            if (criteria.getStringMaxlengthBob() != null) {
                specification = specification.and(buildStringSpecification(criteria.getStringMaxlengthBob(), FieldTestServiceClassEntity_.stringMaxlengthBob));
            }
            if (criteria.getStringPatternBob() != null) {
                specification = specification.and(buildStringSpecification(criteria.getStringPatternBob(), FieldTestServiceClassEntity_.stringPatternBob));
            }
            if (criteria.getIntegerBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getIntegerBob(), FieldTestServiceClassEntity_.integerBob));
            }
            if (criteria.getIntegerRequiredBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getIntegerRequiredBob(), FieldTestServiceClassEntity_.integerRequiredBob));
            }
            if (criteria.getIntegerMinBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getIntegerMinBob(), FieldTestServiceClassEntity_.integerMinBob));
            }
            if (criteria.getIntegerMaxBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getIntegerMaxBob(), FieldTestServiceClassEntity_.integerMaxBob));
            }
            if (criteria.getLongBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLongBob(), FieldTestServiceClassEntity_.longBob));
            }
            if (criteria.getLongRequiredBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLongRequiredBob(), FieldTestServiceClassEntity_.longRequiredBob));
            }
            if (criteria.getLongMinBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLongMinBob(), FieldTestServiceClassEntity_.longMinBob));
            }
            if (criteria.getLongMaxBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLongMaxBob(), FieldTestServiceClassEntity_.longMaxBob));
            }
            if (criteria.getFloatBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFloatBob(), FieldTestServiceClassEntity_.floatBob));
            }
            if (criteria.getFloatRequiredBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFloatRequiredBob(), FieldTestServiceClassEntity_.floatRequiredBob));
            }
            if (criteria.getFloatMinBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFloatMinBob(), FieldTestServiceClassEntity_.floatMinBob));
            }
            if (criteria.getFloatMaxBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFloatMaxBob(), FieldTestServiceClassEntity_.floatMaxBob));
            }
            if (criteria.getDoubleRequiredBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDoubleRequiredBob(), FieldTestServiceClassEntity_.doubleRequiredBob));
            }
            if (criteria.getDoubleMinBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDoubleMinBob(), FieldTestServiceClassEntity_.doubleMinBob));
            }
            if (criteria.getDoubleMaxBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDoubleMaxBob(), FieldTestServiceClassEntity_.doubleMaxBob));
            }
            if (criteria.getBigDecimalRequiredBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBigDecimalRequiredBob(), FieldTestServiceClassEntity_.bigDecimalRequiredBob));
            }
            if (criteria.getBigDecimalMinBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBigDecimalMinBob(), FieldTestServiceClassEntity_.bigDecimalMinBob));
            }
            if (criteria.getBigDecimalMaxBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBigDecimalMaxBob(), FieldTestServiceClassEntity_.bigDecimalMaxBob));
            }
            if (criteria.getLocalDateBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLocalDateBob(), FieldTestServiceClassEntity_.localDateBob));
            }
            if (criteria.getLocalDateRequiredBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLocalDateRequiredBob(), FieldTestServiceClassEntity_.localDateRequiredBob));
            }
            if (criteria.getInstantBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getInstantBob(), FieldTestServiceClassEntity_.instantBob));
            }
            if (criteria.getInstanteRequiredBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getInstanteRequiredBob(), FieldTestServiceClassEntity_.instanteRequiredBob));
            }
            if (criteria.getZonedDateTimeBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getZonedDateTimeBob(), FieldTestServiceClassEntity_.zonedDateTimeBob));
            }
            if (criteria.getZonedDateTimeRequiredBob() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getZonedDateTimeRequiredBob(), FieldTestServiceClassEntity_.zonedDateTimeRequiredBob));
            }
            if (criteria.getBooleanBob() != null) {
                specification = specification.and(buildSpecification(criteria.getBooleanBob(), FieldTestServiceClassEntity_.booleanBob));
            }
            if (criteria.getBooleanRequiredBob() != null) {
                specification = specification.and(buildSpecification(criteria.getBooleanRequiredBob(), FieldTestServiceClassEntity_.booleanRequiredBob));
            }
            if (criteria.getEnumBob() != null) {
                specification = specification.and(buildSpecification(criteria.getEnumBob(), FieldTestServiceClassEntity_.enumBob));
            }
            if (criteria.getEnumRequiredBob() != null) {
                specification = specification.and(buildSpecification(criteria.getEnumRequiredBob(), FieldTestServiceClassEntity_.enumRequiredBob));
            }
        }
        return specification;
    }
}
