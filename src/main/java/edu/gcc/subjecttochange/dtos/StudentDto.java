package edu.gcc.subjecttochange.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class StudentDto extends PersonDto {

    @JsonProperty("id")
    public int id;
    @JsonProperty("major")
    public String major;
    @JsonProperty("email")
    public String email;

    @JsonProperty("password")
    public String password;

    @JsonProperty("jwt")
    public String jwt;
}
