package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.TestManyRelPaginDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestManyRelPaginDTO entity.
 */
public interface TestManyRelPaginDTOSearchRepository extends ElasticsearchRepository<TestManyRelPaginDTO, Long> {
}
