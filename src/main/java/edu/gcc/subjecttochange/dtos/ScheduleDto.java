package edu.gcc.subjecttochange.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.gcc.subjecttochange.models.Activity;
import edu.gcc.subjecttochange.models.Course;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScheduleDto {
    @JsonProperty("courses")
    public List<Course> courses;
    @JsonProperty("events")
    public List<Activity> events;
}
