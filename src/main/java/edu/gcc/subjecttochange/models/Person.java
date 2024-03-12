package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Person {
    @JsonProperty("firstName")
    public String firstName;

    @JsonProperty("lastName")
    public String lastName;

}
