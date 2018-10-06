package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TestOneToOne;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TestOneToOne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestOneToOneRepository extends JpaRepository<TestOneToOne, Long> {

}
