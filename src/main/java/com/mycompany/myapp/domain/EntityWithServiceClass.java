package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A EntityWithServiceClass.
 */
@Entity
@Table(name = "entity_with_service_class")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "entitywithserviceclass")
public class EntityWithServiceClass implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "zoe")
    private String zoe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZoe() {
        return zoe;
    }

    public EntityWithServiceClass zoe(String zoe) {
        this.zoe = zoe;
        return this;
    }

    public void setZoe(String zoe) {
        this.zoe = zoe;
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
        EntityWithServiceClass entityWithServiceClass = (EntityWithServiceClass) o;
        if (entityWithServiceClass.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entityWithServiceClass.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntityWithServiceClass{" +
            "id=" + getId() +
            ", zoe='" + getZoe() + "'" +
            "}";
    }
}
