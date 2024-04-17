package edu.gcc.subjecttochange.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProfessorDto extends PersonDto {
    @JsonProperty("department")
    public String department;
}
