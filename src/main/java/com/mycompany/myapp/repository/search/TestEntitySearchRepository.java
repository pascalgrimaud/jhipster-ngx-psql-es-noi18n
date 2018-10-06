package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestEntity entity.
 */
public interface TestEntitySearchRepository extends ElasticsearchRepository<TestEntity, Long> {
}
