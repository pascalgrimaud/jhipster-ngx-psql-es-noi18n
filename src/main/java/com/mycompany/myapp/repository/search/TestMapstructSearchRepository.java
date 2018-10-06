package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestMapstruct;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestMapstruct entity.
 */
public interface TestMapstructSearchRepository extends ElasticsearchRepository<TestMapstruct, Long> {
}
