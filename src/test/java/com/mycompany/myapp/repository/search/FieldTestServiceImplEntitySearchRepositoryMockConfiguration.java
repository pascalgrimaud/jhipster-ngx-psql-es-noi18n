package com.mycompany.myapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of FieldTestServiceImplEntitySearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class FieldTestServiceImplEntitySearchRepositoryMockConfiguration {

    @MockBean
    private FieldTestServiceImplEntitySearchRepository mockFieldTestServiceImplEntitySearchRepository;

}
