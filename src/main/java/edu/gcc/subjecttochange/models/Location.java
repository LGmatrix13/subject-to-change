package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Location {
    @JsonProperty("building")
    public String building;
    @JsonProperty("roomNumber")
    public int roomNumber;
}
