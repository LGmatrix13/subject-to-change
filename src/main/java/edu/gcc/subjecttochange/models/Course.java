package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.dtos.CourseDto;

import java.util.Objects;

public class Course extends CourseDto {
    public boolean isFull() {
        return enrolled >= seats;
    }

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

    public boolean equals(Object o) {
        Course course = (Course) o;
        return course.number == this.number && course.department.equals(this.department);
    }

    public int hashCode() {
        return Objects.hash(this.number, this.department);
    }
}
