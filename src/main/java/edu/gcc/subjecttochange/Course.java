package edu.gcc.subjecttochange;

import java.util.ArrayList;

public class Course {
    private String code;
    private String semester;
    private int year;
    private String name;
    private String time;
    private String weekDay;
    private int seats;
    private int seatsLeft;
    private Location location;
    private Professor professor;
    private ArrayList<Student> waitlist;

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
        this.semester = semester;
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


    /**
     * uses the professor class variable to request a sign-in for this course
     */
    public void addToWaitlist() throws Exception {
        throw new Exception("Not yet implemented");
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(String weekDay) {
        this.weekDay = weekDay;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public int getSeatsLeft() {
        return seatsLeft;
    }

    public void setSeatsLeft(int seatsLeft) {
        this.seatsLeft = seatsLeft;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public ArrayList<Student> getWaitlist() {
        return waitlist;
    }

    public void setWaitlist(ArrayList<Student> waitlist) {
        this.waitlist = waitlist;
    }
}
