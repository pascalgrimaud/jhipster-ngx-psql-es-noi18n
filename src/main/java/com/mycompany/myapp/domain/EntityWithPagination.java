package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A EntityWithPagination.
 */
@Entity
@Table(name = "entity_with_pagination")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "entitywithpagination")
public class EntityWithPagination implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nathan")
    private String nathan;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNathan() {
        return nathan;
    }

    public EntityWithPagination nathan(String nathan) {
        this.nathan = nathan;
        return this;
    }

    public void setNathan(String nathan) {
        this.nathan = nathan;
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
        EntityWithPagination entityWithPagination = (EntityWithPagination) o;
        if (entityWithPagination.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entityWithPagination.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntityWithPagination{" +
            "id=" + getId() +
            ", nathan='" + getNathan() + "'" +
            "}";
    }
}
