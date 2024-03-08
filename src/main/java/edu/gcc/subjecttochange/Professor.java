package edu.gcc.subjecttochange;

public class Professor extends Person {
    private String department;
    private String bio;
    private Location location;

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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
