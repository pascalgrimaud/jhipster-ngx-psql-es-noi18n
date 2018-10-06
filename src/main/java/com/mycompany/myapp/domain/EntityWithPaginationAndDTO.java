package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A EntityWithPaginationAndDTO.
 */
@Entity
@Table(name = "entity_with_pagination_and_dto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "entitywithpaginationanddto")
public class EntityWithPaginationAndDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "lea")
    private String lea;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLea() {
        return lea;
    }

    public EntityWithPaginationAndDTO lea(String lea) {
        this.lea = lea;
        return this;
    }

    public void setLea(String lea) {
        this.lea = lea;
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
        EntityWithPaginationAndDTO entityWithPaginationAndDTO = (EntityWithPaginationAndDTO) o;
        if (entityWithPaginationAndDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entityWithPaginationAndDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntityWithPaginationAndDTO{" +
            "id=" + getId() +
            ", lea='" + getLea() + "'" +
            "}";
    }
}
