package edu.gcc.subjecttochange.models;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.javalin.http.Context;

import java.util.ArrayList;
import java.util.Objects;
import java.util.UUID;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class Student extends Person {

    @JsonProperty("id")
    public String id = UUID.randomUUID().toString();

    @JsonProperty("major")
    public String major;
    @JsonProperty("year")
    public int year;

    @JsonProperty(value = "fallSchedule")
    public Schedule fallSchedule;

    @JsonProperty("springSchedule")
    public Schedule springSchedule;

    // Constructor to initialize fallSchedule and springSchedule
    public Student() {
        this.fallSchedule = new Schedule(this);
        this.springSchedule = new Schedule(this);
    }

    public static String getStudentId(Context context) {
        return context.header("studentId");
    }

}
