package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.ArrayList;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Schedule extends ArrayList<Course> {
    private final Student student;

    public Schedule(Student student) {
        this.student = student;
    }

    @Override
    public boolean add(Course course) {
        for (Course existingCourse : this) {
            if (course.conflictsWith(existingCourse)) {
                return false; // Conflict found, cannot add the course
            }
        }

        // Check for conflicts with courses in student's fall and spring schedules
        for (Course fallCourse : student.fallSchedule) {
            if (course.conflictsWith(fallCourse)) {
                return false; // Conflict found, cannot add the course
            }
        }

        for (Course springCourse : student.springSchedule) {
            if (course.conflictsWith(springCourse)) {
                return false; // Conflict found, cannot add the course
            }
        }

        if (!course.isFull()) {
            super.add(course);
            return true; // Added successfully
        } else {
            return false; // No available seats
        }
    }
}
