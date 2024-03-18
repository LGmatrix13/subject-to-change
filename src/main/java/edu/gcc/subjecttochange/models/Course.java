package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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

    public boolean isFull() {
        return enrolled >= seats;
    }

    public boolean conflictsWith(Course otherCourse) {
        // Convert start and end times to minutes for easier comparison
        int thisStartMinutes = timeToMinutes(this.startTime);
        int thisEndMinutes = timeToMinutes(this.endTime);
        int otherStartMinutes = timeToMinutes(otherCourse.startTime);
        int otherEndMinutes = timeToMinutes(otherCourse.endTime);

        // Check for overlap
        return !(thisEndMinutes <= otherStartMinutes || thisStartMinutes >= otherEndMinutes);
    }

    private int timeToMinutes(String timeString) {
        // Convert time string to minutes
        String[] parts = timeString.split(":");
        int hours = Integer.parseInt(parts[0]);
        int minutes = Integer.parseInt(parts[1].split(" ")[0]);
        String amPm = parts[1].split(" ")[1];
        if (amPm.equals("PM")) {
            hours += 12;
        }
        return hours * 60 + minutes;
    }
}
