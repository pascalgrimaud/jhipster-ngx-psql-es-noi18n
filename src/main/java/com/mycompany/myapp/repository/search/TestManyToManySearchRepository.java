package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestManyToMany;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestManyToMany entity.
 */
public interface TestManyToManySearchRepository extends ElasticsearchRepository<TestManyToMany, Long> {
}
