package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import edu.gcc.subjecttochange.utilties.EmailComposer;

import java.util.ArrayList;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Schedule extends ArrayList<Course> {
    
    @Override
    public boolean add(Course course) {
        boolean conflictFree = true;

        if (conflictFree) {
            super.add(course);
            // Check for conflicts with courses in student's fall and spring schedules
            for (Course fallCourse : Student.fallSchedule) {
                if (course.conflictsWith(fallCourse)) {
                    // Course is full, compose email to notify
                    String professorEmail = course.professor.firstName;
                    String studentName = "Your Name"; // Replace with the actual student's name
                    EmailComposer.composeEmail(professorEmail, studentName);
                    return false; // No available seats
                }
            }

            for (Course springCourse : Student.springSchedule) {
                if (course.conflictsWith(springCourse)) {
                    return false; // Conflict found, cannot add the course
                }
            }

            if (!course.isFull()) {
               return super.add(course);
            } else {
                return false; // No available seats
            }
        }
        return conflictFree;
    }
}
