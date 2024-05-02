package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.dtos.ScheduleDto;
import java.util.List;

public class Schedule extends ScheduleDto {
    public Schedule(List<Course> courses) {
        this.courses = courses;
        this.events = Activities.getActivties();
    }
}
