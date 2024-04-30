package edu.gcc.subjecttochange.models;


import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.dtos.ScheduleDto;

import java.util.List;

public class Schedule extends ScheduleDto {
    public Schedule(List<CourseDto> courseDtos) {
        this.courseDtos = courseDtos;
        this.events = Events.getEvents();
    }
    public boolean conflictFree(Course course) {
        // Overloaded method to check for conflicts with Activities
        for (CourseDto existingCourse : this.courseDtos) {
            if (existingCourse.conflictsWith(course)) {
                return false; // Conflict found, cannot add the activity
            }
        }

        // if the activity is a course and it's not full, add
        return !course.isFull();
    }
}
