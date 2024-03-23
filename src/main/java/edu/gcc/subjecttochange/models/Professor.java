package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Professor extends Person {
    @JsonProperty("department")
    public String department;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Professor professor = (Professor) o;
        return Objects.equals(department, professor.department) &&
               Objects.equals(firstName, professor.firstName) &&
               Objects.equals(lastName, professor.lastName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.firstName, this.lastName, department);
    }
}
