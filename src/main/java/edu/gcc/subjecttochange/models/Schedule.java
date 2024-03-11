package edu.gcc.subjecttochange.models;

import java.util.ArrayList;
import java.util.HashSet;

public class Schedule {
    public enum Semester {
        FALL,
        SPRING
    }
    public Semester semester;
    private final HashSet<Course> courses;

    // idk something i guess
    public Schedule(Semester semester) {
        this.semester = semester;
        this.courses = new HashSet<>();
    }

    public boolean addCourse(Course course) {
        boolean conflictFree = true;
        for (Course item : courses) {
            if (item.weekDay.equals(course.weekDay) && item.time.equals(course.weekDay)) {
                conflictFree = false;
                break;
            }
        }

        if (conflictFree) {
            courses.add(course);
        }

        return conflictFree;
    }

    public void removeCourse(Course course) {
        courses.remove(course);
    }
}
