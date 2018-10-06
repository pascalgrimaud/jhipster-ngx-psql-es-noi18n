package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TestMapstruct entity.
 */
public class TestMapstructDTO implements Serializable {

    private Long id;

    private Long userOneToManyId;

    private String userOneToManyLogin;

    private Set<UserDTO> userManyToManies = new HashSet<>();

    private Long userOneToOneId;

    private String userOneToOneLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserOneToManyId() {
        return userOneToManyId;
    }

    public void setUserOneToManyId(Long userId) {
        this.userOneToManyId = userId;
    }

    public String getUserOneToManyLogin() {
        return userOneToManyLogin;
    }

    public void setUserOneToManyLogin(String userLogin) {
        this.userOneToManyLogin = userLogin;
    }

    public Set<UserDTO> getUserManyToManies() {
        return userManyToManies;
    }

    public void setUserManyToManies(Set<UserDTO> users) {
        this.userManyToManies = users;
    }

    public Long getUserOneToOneId() {
        return userOneToOneId;
    }

    public void setUserOneToOneId(Long userId) {
        this.userOneToOneId = userId;
    }

    public String getUserOneToOneLogin() {
        return userOneToOneLogin;
    }

    public void setUserOneToOneLogin(String userLogin) {
        this.userOneToOneLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TestMapstructDTO testMapstructDTO = (TestMapstructDTO) o;
        if (testMapstructDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testMapstructDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestMapstructDTO{" +
            "id=" + getId() +
            ", userOneToMany=" + getUserOneToManyId() +
            ", userOneToMany='" + getUserOneToManyLogin() + "'" +
            ", userOneToOne=" + getUserOneToOneId() +
            ", userOneToOne='" + getUserOneToOneLogin() + "'" +
            "}";
    }
}
