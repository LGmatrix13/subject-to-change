package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.ArrayList;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Schedule extends ArrayList<Course> {
    
    @Override
    public boolean add(Course course) {
        if (course.isFull()) {
            System.out.println("full");
            return false;
        }

        for (Course otherCourse : this) {
            if (course.conflictsWith(otherCourse)) {
                System.out.printf("Conflicts with other course: %s", otherCourse.name);
                return false;
            }
        }

        System.out.println(super.add(course));
        return true;
    }
}
