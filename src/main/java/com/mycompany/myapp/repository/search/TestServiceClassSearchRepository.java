package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestServiceClass;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestServiceClass entity.
 */
public interface TestServiceClassSearchRepository extends ElasticsearchRepository<TestServiceClass, Long> {
}
