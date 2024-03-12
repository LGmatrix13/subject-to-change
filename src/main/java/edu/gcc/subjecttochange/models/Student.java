package edu.gcc.subjecttochange.models;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.javalin.http.Context;

import java.util.ArrayList;
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
    public Schedule fallSchedule = new Schedule();
    @JsonProperty("springSchedule")
    public Schedule springSchedule = new Schedule();

    public static String getStudentId(Context context) {
        return context.header("studentId");
    }
}
