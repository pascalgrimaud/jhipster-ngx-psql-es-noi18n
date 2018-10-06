package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestManyToOne;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestManyToOne entity.
 */
public interface TestManyToOneSearchRepository extends ElasticsearchRepository<TestManyToOne, Long> {
}
