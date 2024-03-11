package edu.gcc.subjecttochange.models;

public class Professor extends Person {
    public String department;
    public String bio;
    public Location location;

    public Professor(
        int id,
        String firstName,
        String lastName,
        String email,
        String department,
        String bio,
        Location location
    ) {
        super(id, firstName, lastName, email);
        this.department = department;
        this.bio = bio;
        this.location = location;
    }

    public Professor() {
        super(1, "Jane", "Doe", "jj@gcc.edu");
        this.department = "COMP";
        this.bio = "";
        this.location = new Location();
    }
}
