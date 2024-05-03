package edu.gcc.subjecttochange.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.gcc.subjecttochange.models.Activity;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ActivityDto {
    @JsonProperty("name")
    public String name;
    @JsonProperty("startTime")
    public String startTime;
    @JsonProperty("endTime")
    public String endTime;
    @JsonProperty("weekday")
    public String weekday;
}
