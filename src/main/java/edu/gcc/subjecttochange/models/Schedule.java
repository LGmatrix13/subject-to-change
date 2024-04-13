package edu.gcc.subjecttochange.models;


import java.util.ArrayList;
import java.util.List;

public class Schedule  {

    public static boolean conflictFree(List<Course> courses, Course course) {
        // Check for conflicts with courses in the selected semester schedule
        for (Course existingCourse : courses) {
            if (course.conflictsWith(existingCourse)) {
                return false; // Conflict found, cannot add the course
            }
        }

        // if the course is not full, add
        return !course.isFull();
    }
}
