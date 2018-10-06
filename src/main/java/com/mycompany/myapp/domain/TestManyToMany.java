package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TestManyToMany.
 */
@Entity
@Table(name = "test_many_to_many")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "testmanytomany")
public class TestManyToMany implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_many_to_many_test_entity",
               joinColumns = @JoinColumn(name = "test_many_to_manies_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "test_entities_id", referencedColumnName = "id"))
    private Set<TestEntity> testEntities = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_many_to_many_test_mapstruct",
               joinColumns = @JoinColumn(name = "test_many_to_manies_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "test_mapstructs_id", referencedColumnName = "id"))
    private Set<TestMapstruct> testMapstructs = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_many_to_many_test_service_class",
               joinColumns = @JoinColumn(name = "test_many_to_manies_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "test_service_classes_id", referencedColumnName = "id"))
    private Set<TestServiceClass> testServiceClasses = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_many_to_many_test_service_impl",
               joinColumns = @JoinColumn(name = "test_many_to_manies_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "test_service_impls_id", referencedColumnName = "id"))
    private Set<TestServiceImpl> testServiceImpls = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_many_to_many_test_infinite_scroll",
               joinColumns = @JoinColumn(name = "test_many_to_manies_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "test_infinite_scrolls_id", referencedColumnName = "id"))
    private Set<TestInfiniteScroll> testInfiniteScrolls = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_many_to_many_test_pager",
               joinColumns = @JoinColumn(name = "test_many_to_manies_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "test_pagers_id", referencedColumnName = "id"))
    private Set<TestPager> testPagers = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_many_to_many_test_pagination",
               joinColumns = @JoinColumn(name = "test_many_to_manies_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "test_paginations_id", referencedColumnName = "id"))
    private Set<TestPagination> testPaginations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_many_to_many_test_custom_table_name",
               joinColumns = @JoinColumn(name = "test_many_to_manies_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "test_custom_table_names_id", referencedColumnName = "id"))
    private Set<TestCustomTableName> testCustomTableNames = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TestEntity> getTestEntities() {
        return testEntities;
    }

    public TestManyToMany testEntities(Set<TestEntity> testEntities) {
        this.testEntities = testEntities;
        return this;
    }

    public TestManyToMany addTestEntity(TestEntity testEntity) {
        this.testEntities.add(testEntity);
        return this;
    }

    public TestManyToMany removeTestEntity(TestEntity testEntity) {
        this.testEntities.remove(testEntity);
        return this;
    }

    public void setTestEntities(Set<TestEntity> testEntities) {
        this.testEntities = testEntities;
    }

    public Set<TestMapstruct> getTestMapstructs() {
        return testMapstructs;
    }

    public TestManyToMany testMapstructs(Set<TestMapstruct> testMapstructs) {
        this.testMapstructs = testMapstructs;
        return this;
    }

    public TestManyToMany addTestMapstruct(TestMapstruct testMapstruct) {
        this.testMapstructs.add(testMapstruct);
        return this;
    }

    public TestManyToMany removeTestMapstruct(TestMapstruct testMapstruct) {
        this.testMapstructs.remove(testMapstruct);
        return this;
    }

    public void setTestMapstructs(Set<TestMapstruct> testMapstructs) {
        this.testMapstructs = testMapstructs;
    }

    public Set<TestServiceClass> getTestServiceClasses() {
        return testServiceClasses;
    }

    public TestManyToMany testServiceClasses(Set<TestServiceClass> testServiceClasses) {
        this.testServiceClasses = testServiceClasses;
        return this;
    }

    public TestManyToMany addTestServiceClass(TestServiceClass testServiceClass) {
        this.testServiceClasses.add(testServiceClass);
        return this;
    }

    public TestManyToMany removeTestServiceClass(TestServiceClass testServiceClass) {
        this.testServiceClasses.remove(testServiceClass);
        return this;
    }

    public void setTestServiceClasses(Set<TestServiceClass> testServiceClasses) {
        this.testServiceClasses = testServiceClasses;
    }

    public Set<TestServiceImpl> getTestServiceImpls() {
        return testServiceImpls;
    }

    public TestManyToMany testServiceImpls(Set<TestServiceImpl> testServiceImpls) {
        this.testServiceImpls = testServiceImpls;
        return this;
    }

    public TestManyToMany addTestServiceImpl(TestServiceImpl testServiceImpl) {
        this.testServiceImpls.add(testServiceImpl);
        return this;
    }

    public TestManyToMany removeTestServiceImpl(TestServiceImpl testServiceImpl) {
        this.testServiceImpls.remove(testServiceImpl);
        return this;
    }

    public void setTestServiceImpls(Set<TestServiceImpl> testServiceImpls) {
        this.testServiceImpls = testServiceImpls;
    }

    public Set<TestInfiniteScroll> getTestInfiniteScrolls() {
        return testInfiniteScrolls;
    }

    public TestManyToMany testInfiniteScrolls(Set<TestInfiniteScroll> testInfiniteScrolls) {
        this.testInfiniteScrolls = testInfiniteScrolls;
        return this;
    }

    public TestManyToMany addTestInfiniteScroll(TestInfiniteScroll testInfiniteScroll) {
        this.testInfiniteScrolls.add(testInfiniteScroll);
        return this;
    }

    public TestManyToMany removeTestInfiniteScroll(TestInfiniteScroll testInfiniteScroll) {
        this.testInfiniteScrolls.remove(testInfiniteScroll);
        return this;
    }

    public void setTestInfiniteScrolls(Set<TestInfiniteScroll> testInfiniteScrolls) {
        this.testInfiniteScrolls = testInfiniteScrolls;
    }

    public Set<TestPager> getTestPagers() {
        return testPagers;
    }

    public TestManyToMany testPagers(Set<TestPager> testPagers) {
        this.testPagers = testPagers;
        return this;
    }

    public TestManyToMany addTestPager(TestPager testPager) {
        this.testPagers.add(testPager);
        return this;
    }

    public TestManyToMany removeTestPager(TestPager testPager) {
        this.testPagers.remove(testPager);
        return this;
    }

    public void setTestPagers(Set<TestPager> testPagers) {
        this.testPagers = testPagers;
    }

    public Set<TestPagination> getTestPaginations() {
        return testPaginations;
    }

    public TestManyToMany testPaginations(Set<TestPagination> testPaginations) {
        this.testPaginations = testPaginations;
        return this;
    }

    public TestManyToMany addTestPagination(TestPagination testPagination) {
        this.testPaginations.add(testPagination);
        return this;
    }

    public TestManyToMany removeTestPagination(TestPagination testPagination) {
        this.testPaginations.remove(testPagination);
        return this;
    }

    public void setTestPaginations(Set<TestPagination> testPaginations) {
        this.testPaginations = testPaginations;
    }

    public Set<TestCustomTableName> getTestCustomTableNames() {
        return testCustomTableNames;
    }

    public TestManyToMany testCustomTableNames(Set<TestCustomTableName> testCustomTableNames) {
        this.testCustomTableNames = testCustomTableNames;
        return this;
    }

    public TestManyToMany addTestCustomTableName(TestCustomTableName testCustomTableName) {
        this.testCustomTableNames.add(testCustomTableName);
        return this;
    }

    public TestManyToMany removeTestCustomTableName(TestCustomTableName testCustomTableName) {
        this.testCustomTableNames.remove(testCustomTableName);
        return this;
    }

    public void setTestCustomTableNames(Set<TestCustomTableName> testCustomTableNames) {
        this.testCustomTableNames = testCustomTableNames;
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
        TestManyToMany testManyToMany = (TestManyToMany) o;
        if (testManyToMany.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testManyToMany.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestManyToMany{" +
            "id=" + getId() +
            "}";
    }
}
