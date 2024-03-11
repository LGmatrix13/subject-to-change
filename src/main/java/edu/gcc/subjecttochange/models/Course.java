package edu.gcc.subjecttochange.models;

import java.util.ArrayList;
import java.util.Objects;


public class Course {
    public enum Semester {
        FALL,
        SPRING
    }
    public String code;
    public Semester semester;
    public Integer year;
    public String name;
    public String time;
    public String weekDay;
    public Integer seats;
    public Integer seatsLeft;
    public Location location;
    public Professor professor;
    public ArrayList<Student> waitlist;

    public Course(
        String code,
        String semester,
        int year,
        String name,
        String time,
        String weekDay,
        int seats,
        int seatsLeft,
        Location location,
        Professor professor
    ) {
        this.code = code;
        this.semester = Semester.FALL;
        this.year = year;
        this.name = name;
        this.time = time;
        this.weekDay = weekDay;
        this.seats = seats;
        this.seatsLeft = seatsLeft;
        this.location = location;
        this.professor = professor;
        this.waitlist = new ArrayList<>();
    }

    public Course(String code) {
        this.code = code;
        this.semester = Semester.FALL;
        this.year = 2023;
        this.name = "Software";
        this.time = "9:00 AM";
        this.weekDay = "MWF";
        this.seats = 10;
        this.seatsLeft = 2;
        this.location = new Location();
        this.professor = new Professor();
        this.waitlist = new ArrayList<>();
    }
}
