package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.gcc.subjecttochange.dtos.CourseDto;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class Course extends CourseDto {
    @JsonIgnore
    public boolean isFull() {
        return enrolled >= seats;
    }
    @JsonIgnore
    public boolean conflictsWith(Course otherCourse) {
        if (otherCourse.equals(this)) {
            return true;
        } else if (otherCourse.endTime == null || otherCourse.startTime == null) {
            return false;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime otherStartTime = LocalDateTime.parse(otherCourse.startTime, formatter);
        LocalDateTime otherEndTime = LocalDateTime.parse(otherCourse.endTime, formatter);
        LocalDateTime startTime = LocalDateTime.parse(this.startTime, formatter);
        LocalDateTime endTime = LocalDateTime.parse(this.endTime, formatter);

        if (startTime.isEqual(otherStartTime) && endTime.isEqual(otherEndTime)) {
            return true;
        }

        return (this.weekday.contains(otherCourse.weekday) && startTime.isBefore(otherEndTime) && otherStartTime.isBefore(endTime));
    }

    @JsonIgnore
    public boolean conflictsWith(Activity otherActivity) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime otherStartTime = LocalDateTime.parse(otherActivity.startTime, formatter);
        LocalDateTime otherEndTime = LocalDateTime.parse(otherActivity.endTime, formatter);
        LocalDateTime startTime = LocalDateTime.parse(this.startTime, formatter);
        LocalDateTime endTime = LocalDateTime.parse(this.endTime, formatter);

        if (startTime.isEqual(otherStartTime) && endTime.isEqual(otherEndTime)) {
            return true;
        }

        return (this.weekday.contains(otherActivity.weekday) && startTime.isBefore(otherEndTime) && otherStartTime.isBefore(endTime));
    }

    @JsonIgnore
    public boolean conflictFree(List<Course> courses) {
        // Overloaded method to check for conflicts with Activities
        for (Course existingCourse : courses) {
            if (existingCourse.conflictsWith(this)) {
                return false; // Conflict found, cannot add the activity
            }
        }

        for (Activity existingActivity : Activities.getActivties()) {
            if (existingActivity.conflictsWith(this)) {
                return false;
            }
        }

        return !this.isFull();
    }

    @JsonIgnore
    @Override
    public boolean equals(Object o) {
        if (o instanceof Course course) {
            return course.number == this.number && course.department.equals(this.department);
        }
        return false;
    }

    @JsonIgnore
    public int hashCode() {
        return Objects.hash(this.number, this.department);
    }
}
