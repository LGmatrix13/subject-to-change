package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Schedule {
    public enum Semester {
        FALL,
        SPRING
    }
    @JsonProperty("semester")
    public Semester semester;

    @JsonProperty("courses")
    private final ArrayList<Course> courses;

    // idk something i guess
    public Schedule(Semester semester) {
        this.semester = semester;
        this.courses = new ArrayList<>();
    }

    public boolean addCourse(Course course) {
        boolean conflictFree = true;
        for (Course item : courses) {
            if (item.weekday.equals(course.weekday)) {
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
