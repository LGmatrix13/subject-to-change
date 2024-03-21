package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import edu.gcc.subjecttochange.utilties.EmailComposer;

import java.util.ArrayList;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Schedule extends ArrayList<Course> {

    private final Student student; // Field to hold the Student instance

    public Schedule(Student student) {
        this.student = student;
    }

    public boolean add(Course course, String semester) {

        // Choose the appropriate semester schedule to check conflicts
        Iterable<Course> semesterSchedule = "fall".equals(semester) ? student.fallSchedule : student.springSchedule;

        // Check for conflicts with courses in the selected semester schedule
        for (Course existingCourse : semesterSchedule) {
            if (course.conflictsWith(existingCourse)) {
                return false; // Conflict found, cannot add the course
            }
        }

        if (!course.isFull()) {
            System.out.println(super.add(course));
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
