package com.mycompany.myapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of TestOneToOneSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TestOneToOneSearchRepositoryMockConfiguration {

    @MockBean
    private TestOneToOneSearchRepository mockTestOneToOneSearchRepository;

}
