package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestOneToOne;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestOneToOne entity.
 */
public interface TestOneToOneSearchRepository extends ElasticsearchRepository<TestOneToOne, Long> {
}
