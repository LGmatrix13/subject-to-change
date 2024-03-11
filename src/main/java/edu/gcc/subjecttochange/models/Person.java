package edu.gcc.subjecttochange.models;

import io.javalin.http.Context;

public class Person {
    public int id;
    public String firstName;
    public String lastName;

    public String email;

    public Person(int id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
