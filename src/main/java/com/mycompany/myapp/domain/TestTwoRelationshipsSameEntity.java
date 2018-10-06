package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TestTwoRelationshipsSameEntity.
 */
@Entity
@Table(name = "test_multiple_rel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "testtworelationshipssameentity")
public class TestTwoRelationshipsSameEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TestEntity firstRelationship;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TestEntity secondRelationship;

    @OneToOne    @JoinColumn(unique = true)
    private User userOne;

    @OneToOne    @JoinColumn(unique = true)
    private User userTwo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Division firstUniqueRequiredRelation;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Division secondUniqueRequiredRelation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TestEntity getFirstRelationship() {
        return firstRelationship;
    }

    public TestTwoRelationshipsSameEntity firstRelationship(TestEntity testEntity) {
        this.firstRelationship = testEntity;
        return this;
    }

    public void setFirstRelationship(TestEntity testEntity) {
        this.firstRelationship = testEntity;
    }

    public TestEntity getSecondRelationship() {
        return secondRelationship;
    }

    public TestTwoRelationshipsSameEntity secondRelationship(TestEntity testEntity) {
        this.secondRelationship = testEntity;
        return this;
    }

    public void setSecondRelationship(TestEntity testEntity) {
        this.secondRelationship = testEntity;
    }

    public User getUserOne() {
        return userOne;
    }

    public TestTwoRelationshipsSameEntity userOne(User user) {
        this.userOne = user;
        return this;
    }

    public void setUserOne(User user) {
        this.userOne = user;
    }

    public User getUserTwo() {
        return userTwo;
    }

    public TestTwoRelationshipsSameEntity userTwo(User user) {
        this.userTwo = user;
        return this;
    }

    public void setUserTwo(User user) {
        this.userTwo = user;
    }

    public Division getFirstUniqueRequiredRelation() {
        return firstUniqueRequiredRelation;
    }

    public TestTwoRelationshipsSameEntity firstUniqueRequiredRelation(Division division) {
        this.firstUniqueRequiredRelation = division;
        return this;
    }

    public void setFirstUniqueRequiredRelation(Division division) {
        this.firstUniqueRequiredRelation = division;
    }

    public Division getSecondUniqueRequiredRelation() {
        return secondUniqueRequiredRelation;
    }

    public TestTwoRelationshipsSameEntity secondUniqueRequiredRelation(Division division) {
        this.secondUniqueRequiredRelation = division;
        return this;
    }

    public void setSecondUniqueRequiredRelation(Division division) {
        this.secondUniqueRequiredRelation = division;
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
        TestTwoRelationshipsSameEntity testTwoRelationshipsSameEntity = (TestTwoRelationshipsSameEntity) o;
        if (testTwoRelationshipsSameEntity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testTwoRelationshipsSameEntity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestTwoRelationshipsSameEntity{" +
            "id=" + getId() +
            "}";
    }
}
