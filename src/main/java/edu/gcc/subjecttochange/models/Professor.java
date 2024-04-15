package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.dtos.ProfessorDto;

import java.util.Objects;

public class Professor extends ProfessorDto {
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
