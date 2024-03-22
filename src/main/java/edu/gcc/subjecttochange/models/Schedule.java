package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import edu.gcc.subjecttochange.utilties.EmailComposer;

import java.util.ArrayList;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Schedule extends ArrayList<Course> {
    public boolean add(Course course) {
        // Check for conflicts with courses in the selected semester schedule
        for (Course existingCourse : this) {
            if (course.conflictsWith(existingCourse)) {
                return false; // Conflict found, cannot add the course
            }
        }

        if (!course.isFull()) {
            return super.add(course);
        } else {
            // Course is full, compose email to notify
            String professorEmail = course.professor.firstName;
            String studentName = "Your Name"; // Replace with the actual student's name
            EmailComposer.composeEmail(professorEmail, studentName);
            return false; // No available seats
        }
    }
}
