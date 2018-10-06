package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestCustomTableName;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestCustomTableName entity.
 */
public interface TestCustomTableNameSearchRepository extends ElasticsearchRepository<TestCustomTableName, Long> {
}
