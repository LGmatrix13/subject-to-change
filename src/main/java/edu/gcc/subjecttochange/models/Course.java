package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.gcc.subjecttochange.utilties.Database;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Objects;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


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

    @JsonIgnore
    public boolean isFull() {
        return enrolled >= seats;
    }

    @JsonIgnore
    public boolean conflictsWith(Course otherCourse) {
        // check if course is the same
        if (otherCourse.equals(this)){
            return true;
        }

        // Convert start and end times to minutes for easier comparison
        int thisStartMinutes = timeToMinutes(this.startTime);
        int thisEndMinutes = timeToMinutes(this.endTime);
        int otherStartMinutes = timeToMinutes(otherCourse.startTime);
        int otherEndMinutes = timeToMinutes(otherCourse.endTime);

        // Check for overlap
        return otherCourse.weekday.equals(this.weekday) && !(thisEndMinutes <= otherStartMinutes || thisStartMinutes >= otherEndMinutes);
    }

    @JsonIgnore
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

    @Override
    public boolean equals(Object o) {
        Course course = (Course) o;
        return course.number == this.number && course.department.equals(this.department);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.number, this.department);
    }
}
