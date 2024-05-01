package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.gcc.subjecttochange.dtos.ActivityDto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class Activity extends ActivityDto {

    @JsonIgnore
    public boolean conflictsWith(Activity otherActivity) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime otherStartTime = LocalDateTime.parse(String.format("%s %s", "2024-04-29", otherActivity.startTime), formatter);
        LocalDateTime otherEndTime = LocalDateTime.parse(String.format("%s %s", "2024-04-29", otherActivity.endTime), formatter);
        LocalDateTime startTime = LocalDateTime.parse(String.format("%s", this.startTime), formatter);
        LocalDateTime endTime = LocalDateTime.parse(String.format("%s", this.endTime), formatter);

        return (this.weekday.equals(otherActivity.weekday) &&
                ((startTime.isEqual(otherStartTime) || startTime.isBefore(otherEndTime)) &&
                        (endTime.isEqual(otherEndTime) || endTime.isAfter(otherStartTime))));
    }

    @JsonIgnore
    public boolean equals(Object o){
        if(o instanceof Activity a) {
            return (this.weekday.equals(a.weekday) && this.startTime.equals(a.startTime) && this.endTime.equals(a.endTime));
        }
        return false;
    }

    @JsonIgnore
    public int hashCode() {
        return (name.hashCode() * startTime.hashCode() * endTime.hashCode() * weekday.hashCode());
    }
}
