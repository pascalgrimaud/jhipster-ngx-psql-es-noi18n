package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestTwoRelationshipsSameEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestTwoRelationshipsSameEntity entity.
 */
public interface TestTwoRelationshipsSameEntitySearchRepository extends ElasticsearchRepository<TestTwoRelationshipsSameEntity, Long> {
}
