package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TestMapstruct.
 */
@Entity
@Table(name = "test_mapstruct")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "testmapstruct")
public class TestMapstruct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "testMapstruct")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TestManyToOne> testManyToOnes = new HashSet<>();
    @ManyToMany(mappedBy = "testMapstructs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<TestManyToMany> testManyToManies = new HashSet<>();

    @ManyToMany(mappedBy = "testMapstructs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<TestManyRelPaginDTO> testManyRelPaginDTOS = new HashSet<>();

    @OneToOne(mappedBy = "testMapstruct")
    @JsonIgnore
    private TestOneToOne testOneToOne;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User userOneToMany;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "test_mapstruct_user_many_to_many",
               joinColumns = @JoinColumn(name = "test_mapstructs_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_many_to_manies_id", referencedColumnName = "id"))
    private Set<User> userManyToManies = new HashSet<>();

    @OneToOne    @JoinColumn(unique = true)
    private User userOneToOne;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TestManyToOne> getTestManyToOnes() {
        return testManyToOnes;
    }

    public TestMapstruct testManyToOnes(Set<TestManyToOne> testManyToOnes) {
        this.testManyToOnes = testManyToOnes;
        return this;
    }

    public TestMapstruct addTestManyToOne(TestManyToOne testManyToOne) {
        this.testManyToOnes.add(testManyToOne);
        testManyToOne.setTestMapstruct(this);
        return this;
    }

    public TestMapstruct removeTestManyToOne(TestManyToOne testManyToOne) {
        this.testManyToOnes.remove(testManyToOne);
        testManyToOne.setTestMapstruct(null);
        return this;
    }

    public void setTestManyToOnes(Set<TestManyToOne> testManyToOnes) {
        this.testManyToOnes = testManyToOnes;
    }

    public Set<TestManyToMany> getTestManyToManies() {
        return testManyToManies;
    }

    public TestMapstruct testManyToManies(Set<TestManyToMany> testManyToManies) {
        this.testManyToManies = testManyToManies;
        return this;
    }

    public TestMapstruct addTestManyToMany(TestManyToMany testManyToMany) {
        this.testManyToManies.add(testManyToMany);
        testManyToMany.getTestMapstructs().add(this);
        return this;
    }

    public TestMapstruct removeTestManyToMany(TestManyToMany testManyToMany) {
        this.testManyToManies.remove(testManyToMany);
        testManyToMany.getTestMapstructs().remove(this);
        return this;
    }

    public void setTestManyToManies(Set<TestManyToMany> testManyToManies) {
        this.testManyToManies = testManyToManies;
    }

    public Set<TestManyRelPaginDTO> getTestManyRelPaginDTOS() {
        return testManyRelPaginDTOS;
    }

    public TestMapstruct testManyRelPaginDTOS(Set<TestManyRelPaginDTO> testManyRelPaginDTOS) {
        this.testManyRelPaginDTOS = testManyRelPaginDTOS;
        return this;
    }

    public TestMapstruct addTestManyRelPaginDTO(TestManyRelPaginDTO testManyRelPaginDTO) {
        this.testManyRelPaginDTOS.add(testManyRelPaginDTO);
        testManyRelPaginDTO.getTestMapstructs().add(this);
        return this;
    }

    public TestMapstruct removeTestManyRelPaginDTO(TestManyRelPaginDTO testManyRelPaginDTO) {
        this.testManyRelPaginDTOS.remove(testManyRelPaginDTO);
        testManyRelPaginDTO.getTestMapstructs().remove(this);
        return this;
    }

    public void setTestManyRelPaginDTOS(Set<TestManyRelPaginDTO> testManyRelPaginDTOS) {
        this.testManyRelPaginDTOS = testManyRelPaginDTOS;
    }

    public TestOneToOne getTestOneToOne() {
        return testOneToOne;
    }

    public TestMapstruct testOneToOne(TestOneToOne testOneToOne) {
        this.testOneToOne = testOneToOne;
        return this;
    }

    public void setTestOneToOne(TestOneToOne testOneToOne) {
        this.testOneToOne = testOneToOne;
    }

    public User getUserOneToMany() {
        return userOneToMany;
    }

    public TestMapstruct userOneToMany(User user) {
        this.userOneToMany = user;
        return this;
    }

    public void setUserOneToMany(User user) {
        this.userOneToMany = user;
    }

    public Set<User> getUserManyToManies() {
        return userManyToManies;
    }

    public TestMapstruct userManyToManies(Set<User> users) {
        this.userManyToManies = users;
        return this;
    }

    public TestMapstruct addUserManyToMany(User user) {
        this.userManyToManies.add(user);
        return this;
    }

    public TestMapstruct removeUserManyToMany(User user) {
        this.userManyToManies.remove(user);
        return this;
    }

    public void setUserManyToManies(Set<User> users) {
        this.userManyToManies = users;
    }

    public User getUserOneToOne() {
        return userOneToOne;
    }

    public TestMapstruct userOneToOne(User user) {
        this.userOneToOne = user;
        return this;
    }

    public void setUserOneToOne(User user) {
        this.userOneToOne = user;
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
        TestMapstruct testMapstruct = (TestMapstruct) o;
        if (testMapstruct.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testMapstruct.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestMapstruct{" +
            "id=" + getId() +
            "}";
    }
}
