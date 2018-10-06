package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestPager;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestPager entity.
 */
public interface TestPagerSearchRepository extends ElasticsearchRepository<TestPager, Long> {
}
