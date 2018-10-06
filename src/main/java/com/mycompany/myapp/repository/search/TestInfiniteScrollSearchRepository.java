package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestInfiniteScroll;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestInfiniteScroll entity.
 */
public interface TestInfiniteScrollSearchRepository extends ElasticsearchRepository<TestInfiniteScroll, Long> {
}
