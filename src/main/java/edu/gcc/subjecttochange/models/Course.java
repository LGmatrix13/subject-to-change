package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.gcc.subjecttochange.dtos.CourseDto;

import java.util.Objects;

public class Course extends CourseDto {
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
        int minutes = Integer.parseInt(parts[1]);
        return hours * 60 + minutes;
    }

    @JsonIgnore
    public boolean equals(Object o) {
        Course course = (Course) o;
        return course.number == this.number && course.department.equals(this.department);
    }

    @JsonIgnore
    public int hashCode() {
        return Objects.hash(this.number, this.department);
    }
}
