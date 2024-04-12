package edu.gcc.subjecttochange.models;


import java.util.ArrayList;

public class Schedule extends ArrayList<Course> {
    @Override
    public boolean add(Course course) {

        // Check for conflicts with courses in the selected semester schedule
        for (Course existingCourse : this) {
            if (course.conflictsWith(existingCourse)) {
                return false; // Conflict found, cannot add the course
            }
        }


        // if the course is not full, add
        if (!course.isFull()) {
            return super.add(course);
        }

        return false;
    }
}
