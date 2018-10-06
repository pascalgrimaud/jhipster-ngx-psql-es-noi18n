package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestServiceImpl;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestServiceImpl entity.
 */
public interface TestServiceImplSearchRepository extends ElasticsearchRepository<TestServiceImpl, Long> {
}
