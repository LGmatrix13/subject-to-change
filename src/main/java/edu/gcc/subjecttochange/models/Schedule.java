package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.ArrayList;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Schedule extends ArrayList<Course> {
    
    @Override
    public boolean add(Course course) {
        // Check for conflicts with courses in student's fall and spring schedules
        for (Course otherCourse : this) {
            if (course.conflictsWith(otherCourse)) {
                return false; // No available seats
            }
        }


        if (!course.isFull()) {
           return super.add(course);
        }

        return false;
    }
}
