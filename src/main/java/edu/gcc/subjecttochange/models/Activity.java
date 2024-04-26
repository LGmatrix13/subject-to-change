package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.gcc.subjecttochange.dtos.ActivityDto;

import java.util.Objects;

public class Activity extends ActivityDto {
    @JsonIgnore
    public boolean equals(Object o){
        if(o instanceof Activity)
        {
            Activity a = (Activity) o;
            return (this.weekday == a.weekday && this.startTime == a.startTime &&
                    this.endTime == a.endTime);
        }
        return false;
    }

    @JsonIgnore
    public boolean conflictsWith(Activity activity) {
        if (this.equals(activity)){
            return true;
        }

        // return false if the course is online
        if (this.startTime == null || this.endTime == null) {
            return false;
        }

        // Convert start and end times to minutes for easier comparison
        int thisStartMinutes = timeToMinutes(this.startTime);
        int thisEndMinutes = timeToMinutes(this.endTime);
        int otherStartMinutes = timeToMinutes(activity.startTime);
        int otherEndMinutes = timeToMinutes(activity.endTime);

        // Check for overlap
        return this.weekday.equals(activity.weekday) && !(thisEndMinutes <= otherStartMinutes || thisStartMinutes >= otherEndMinutes);
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
    public int hashCode() {
        return (name.hashCode() * description.hashCode());
    }
}
