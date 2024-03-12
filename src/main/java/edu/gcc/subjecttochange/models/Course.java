package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class Course {
    public enum Semester {
        FALL,
        SPRING
    }
    @JsonProperty("department")
    public String department;
    @JsonProperty("number")
    public int number;
    @JsonProperty("semester")
    public Semester semester;

    @JsonProperty("year")
    public int year;
    @JsonProperty("name")
    public String name;
    @JsonProperty("startTime")
    public String startTime;
    @JsonProperty("endTime")
    public String endTime;

    @JsonProperty("hours")
    public int hours;
    @JsonProperty("weekday")
    public String weekday;
    @JsonProperty("section")
    public String section;
    @JsonProperty("seats")
    public int seats;
    @JsonProperty("enrolled")
    public int enrolled;
    @JsonProperty("professor")
    public Professor professor;
    @JsonProperty("waitlist")
    public List<Student> waitlist;
}
