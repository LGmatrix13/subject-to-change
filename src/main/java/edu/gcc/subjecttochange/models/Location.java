package edu.gcc.subjecttochange.models;

public class Location {
    public String building;
    public int roomNumber;

    public Location(String building, int roomNumber) {
        this.building = building;
        this.roomNumber = roomNumber;
    }

    public Location() {
        this.building = "STEM";
        this.roomNumber = 326;
    }
}
