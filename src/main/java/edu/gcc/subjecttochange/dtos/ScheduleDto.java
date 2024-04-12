package edu.gcc.subjecttochange.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScheduleDto {
    @JsonProperty("id")
    public int id;
    @JsonProperty("courseId")
    public String courseId;
    @JsonProperty("studentId")
    public int studentId;
}
