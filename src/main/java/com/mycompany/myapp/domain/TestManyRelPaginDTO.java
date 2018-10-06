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
 * A TestManyRelPaginDTO.
 */
@Entity
@Table(name = "test_many_many_pagination_dto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "testmanyrelpagindto")
public class TestManyRelPaginDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_many_rel_pagindto_test_mapstruct",
               joinColumns = @JoinColumn(name = "test_many_rel_pagindtos_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "test_mapstructs_id", referencedColumnName = "id"))
    private Set<TestMapstruct> testMapstructs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TestMapstruct> getTestMapstructs() {
        return testMapstructs;
    }

    public TestManyRelPaginDTO testMapstructs(Set<TestMapstruct> testMapstructs) {
        this.testMapstructs = testMapstructs;
        return this;
    }

    public TestManyRelPaginDTO addTestMapstruct(TestMapstruct testMapstruct) {
        this.testMapstructs.add(testMapstruct);
        return this;
    }

    public TestManyRelPaginDTO removeTestMapstruct(TestMapstruct testMapstruct) {
        this.testMapstructs.remove(testMapstruct);
        return this;
    }

    public void setTestMapstructs(Set<TestMapstruct> testMapstructs) {
        this.testMapstructs = testMapstructs;
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
        TestManyRelPaginDTO testManyRelPaginDTO = (TestManyRelPaginDTO) o;
        if (testManyRelPaginDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testManyRelPaginDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestManyRelPaginDTO{" +
            "id=" + getId() +
            "}";
    }
}
