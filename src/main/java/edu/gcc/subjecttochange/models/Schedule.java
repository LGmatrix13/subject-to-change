package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.ArrayList;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Schedule extends ArrayList<Course> {
    @Override
    public boolean add(Course course) {
        boolean conflictFree = true;

        if (conflictFree) {
            super.add(course);
        }

        return conflictFree;
    }
}
