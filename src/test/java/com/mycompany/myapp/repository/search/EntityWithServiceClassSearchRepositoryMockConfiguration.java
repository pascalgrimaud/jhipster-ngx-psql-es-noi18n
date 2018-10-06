package com.mycompany.myapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of EntityWithServiceClassSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class EntityWithServiceClassSearchRepositoryMockConfiguration {

    @MockBean
    private EntityWithServiceClassSearchRepository mockEntityWithServiceClassSearchRepository;

}
