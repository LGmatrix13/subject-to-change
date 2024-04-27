package edu.gcc.subjecttochange.models;


import java.util.ArrayList;
import java.util.List;

public class Schedule  {
    public static boolean conflictFree(List<Course> courses, Course course) {
        // Overloaded method to check for conflicts with Activities
        for (Course existingCourse : courses) {
            if (existingCourse.conflictsWith(course)) {
                return false; // Conflict found, cannot add the activity
            }
        }

        // if the activity is a course and it's not full, add
        return !course.isFull();
    }
}
