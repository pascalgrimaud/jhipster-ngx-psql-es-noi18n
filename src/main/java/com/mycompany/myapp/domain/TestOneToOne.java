package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TestOneToOne.
 */
@Entity
@Table(name = "test_one_to_one")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "testonetoone")
public class TestOneToOne implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne    @JoinColumn(unique = true)
    private TestEntity testEntity;

    @OneToOne    @JoinColumn(unique = true)
    private TestMapstruct testMapstruct;

    @OneToOne    @JoinColumn(unique = true)
    private TestServiceClass testServiceClass;

    @OneToOne    @JoinColumn(unique = true)
    private TestServiceImpl testServiceImpl;

    @OneToOne    @JoinColumn(unique = true)
    private TestInfiniteScroll testInfiniteScroll;

    @OneToOne    @JoinColumn(unique = true)
    private TestPager testPager;

    @OneToOne    @JoinColumn(unique = true)
    private TestPagination testPagination;

    @OneToOne    @JoinColumn(unique = true)
    private TestCustomTableName testCustomTableName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TestEntity getTestEntity() {
        return testEntity;
    }

    public TestOneToOne testEntity(TestEntity testEntity) {
        this.testEntity = testEntity;
        return this;
    }

    public void setTestEntity(TestEntity testEntity) {
        this.testEntity = testEntity;
    }

    public TestMapstruct getTestMapstruct() {
        return testMapstruct;
    }

    public TestOneToOne testMapstruct(TestMapstruct testMapstruct) {
        this.testMapstruct = testMapstruct;
        return this;
    }

    public void setTestMapstruct(TestMapstruct testMapstruct) {
        this.testMapstruct = testMapstruct;
    }

    public TestServiceClass getTestServiceClass() {
        return testServiceClass;
    }

    public TestOneToOne testServiceClass(TestServiceClass testServiceClass) {
        this.testServiceClass = testServiceClass;
        return this;
    }

    public void setTestServiceClass(TestServiceClass testServiceClass) {
        this.testServiceClass = testServiceClass;
    }

    public TestServiceImpl getTestServiceImpl() {
        return testServiceImpl;
    }

    public TestOneToOne testServiceImpl(TestServiceImpl testServiceImpl) {
        this.testServiceImpl = testServiceImpl;
        return this;
    }

    public void setTestServiceImpl(TestServiceImpl testServiceImpl) {
        this.testServiceImpl = testServiceImpl;
    }

    public TestInfiniteScroll getTestInfiniteScroll() {
        return testInfiniteScroll;
    }

    public TestOneToOne testInfiniteScroll(TestInfiniteScroll testInfiniteScroll) {
        this.testInfiniteScroll = testInfiniteScroll;
        return this;
    }

    public void setTestInfiniteScroll(TestInfiniteScroll testInfiniteScroll) {
        this.testInfiniteScroll = testInfiniteScroll;
    }

    public TestPager getTestPager() {
        return testPager;
    }

    public TestOneToOne testPager(TestPager testPager) {
        this.testPager = testPager;
        return this;
    }

    public void setTestPager(TestPager testPager) {
        this.testPager = testPager;
    }

    public TestPagination getTestPagination() {
        return testPagination;
    }

    public TestOneToOne testPagination(TestPagination testPagination) {
        this.testPagination = testPagination;
        return this;
    }

    public void setTestPagination(TestPagination testPagination) {
        this.testPagination = testPagination;
    }

    public TestCustomTableName getTestCustomTableName() {
        return testCustomTableName;
    }

    public TestOneToOne testCustomTableName(TestCustomTableName testCustomTableName) {
        this.testCustomTableName = testCustomTableName;
        return this;
    }

    public void setTestCustomTableName(TestCustomTableName testCustomTableName) {
        this.testCustomTableName = testCustomTableName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TestOneToOne testOneToOne = (TestOneToOne) o;
        if (testOneToOne.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testOneToOne.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestOneToOne{" +
            "id=" + getId() +
            "}";
    }
}
