package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.gcc.subjecttochange.dtos.CourseDto;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
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
        LocalDateTime otherEndTime = LocalDateTime.parse(otherCourse.startTime, formatter);
        LocalDateTime startTime = LocalDateTime.parse(this.startTime, formatter);
        LocalDateTime endTime = LocalDateTime.parse(this.endTime, formatter);

        if (this.weekday.equals(otherCourse.weekday) && startTime.isEqual(otherStartTime) && endTime.isEqual(otherEndTime)) {
            return true;
        }

        return this.weekday.equals(otherCourse.weekday) && (startTime.isBefore(otherEndTime) && otherStartTime.isBefore(endTime));
    }

    @JsonIgnore
    @Override
    public boolean equals(Object o) {
        if(o instanceof Course)
        {
            Course course = (Course) o;
            return course.number == this.number && course.department.equals(this.department);
        }
        return false;
    }

    @JsonIgnore
    public int hashCode() {
        return Objects.hash(this.number, this.department);
    }
}
