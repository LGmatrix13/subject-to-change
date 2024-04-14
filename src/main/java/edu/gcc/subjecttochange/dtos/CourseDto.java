package edu.gcc.subjecttochange.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Professor;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseDto {
    public enum Semester {
        fall,
        spring
    }
    @JsonProperty("id")
    public int id;
    @JsonProperty("department")
    public String department;
    @JsonProperty("number")
    public int number;
    @JsonProperty("semester")
    public Course.Semester semester;
    @JsonProperty("hours")
    public int hours;
    @JsonProperty("year")
    public int year;
    @JsonProperty("name")
    public String name;
    @JsonProperty("startTime")
    public String startTime;
    @JsonProperty("endTime")
    public String endTime;
    @JsonProperty("weekday")
    public String weekday;
    @JsonProperty("section")
    public String section;
    @JsonProperty("seats")
    public int seats;
    @JsonProperty("enrolled")
    public int enrolled;
    @JsonProperty("professorFirstName")
    public String professorFirstName;
    @JsonProperty("professorLastName")
    public String professorLastName;
}
