package edu.gcc.subjecttochange.models;


import io.javalin.http.Context;


public class Student extends Person {
    public String major;
    public int year;

    public Schedule fallSchedule;
    public Schedule springSchedule;

    public Student(
        int id,
        String firstName,
        String lastName,
        String email,
        String major,
        int year
    ) {
        super(id, firstName, lastName, email);
        this.major = major;
        this.year = year;
        this.fallSchedule = new Schedule(Schedule.Semester.FALL);
        this.springSchedule = new Schedule(Schedule.Semester.SPRING);
    }

    public Student(int id) {
        super(id, "Liam", "Grossman", "grossmanlj21@gcc.edu");
        this.major = "Computer Science";
        this.year = 2025;
        this.fallSchedule = new Schedule(Schedule.Semester.FALL);
        this.springSchedule = new Schedule(Schedule.Semester.SPRING);
    }

    public static int getStudentId(Context context) {
        String studentId = context.header("studentId");
        return Integer.parseInt(studentId);
    }
}
