package edu.gcc.subjecttochange.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProfessorDto extends PersonDto {
    @JsonProperty("department")
    public String department;
}
