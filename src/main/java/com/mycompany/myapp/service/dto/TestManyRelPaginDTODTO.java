package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TestManyRelPaginDTO entity.
 */
public class TestManyRelPaginDTODTO implements Serializable {

    private Long id;

    private Set<TestMapstructDTO> testMapstructs = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TestMapstructDTO> getTestMapstructs() {
        return testMapstructs;
    }

    public void setTestMapstructs(Set<TestMapstructDTO> testMapstructs) {
        this.testMapstructs = testMapstructs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TestManyRelPaginDTODTO testManyRelPaginDTODTO = (TestManyRelPaginDTODTO) o;
        if (testManyRelPaginDTODTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testManyRelPaginDTODTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestManyRelPaginDTODTO{" +
            "id=" + getId() +
            "}";
    }
}
