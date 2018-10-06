package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A EntityWithServiceImpl.
 */
@Entity
@Table(name = "entity_with_service_impl")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "entitywithserviceimpl")
public class EntityWithServiceImpl implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "clara")
    private String clara;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClara() {
        return clara;
    }

    public EntityWithServiceImpl clara(String clara) {
        this.clara = clara;
        return this;
    }

    public void setClara(String clara) {
        this.clara = clara;
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
        EntityWithServiceImpl entityWithServiceImpl = (EntityWithServiceImpl) o;
        if (entityWithServiceImpl.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entityWithServiceImpl.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntityWithServiceImpl{" +
            "id=" + getId() +
            ", clara='" + getClara() + "'" +
            "}";
    }
}
