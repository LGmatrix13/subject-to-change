package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.gcc.subjecttochange.dtos.ActivityDto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

public class Activity extends ActivityDto {

    @JsonIgnore
    public boolean conflictsWith(Course otherCourse) {
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
    public boolean equals(Object o) {
        if (o instanceof Activity a) {
            return (this.weekday.equals(a.weekday) && this.startTime.equals(a.startTime) && this.endTime.equals(a.endTime));
        }

        return false;
    }

    @JsonIgnore
    public int hashCode() {
        return (name.hashCode() * startTime.hashCode() * endTime.hashCode() * weekday.hashCode());
    }
}
