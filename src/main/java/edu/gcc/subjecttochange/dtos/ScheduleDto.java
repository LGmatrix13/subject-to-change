package edu.gcc.subjecttochange.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.gcc.subjecttochange.models.Activity;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScheduleDto {
    @JsonProperty("courses")
    public List<CourseDto> courseDtos;
    @JsonProperty("events")
    public List<Activity> events;
}
