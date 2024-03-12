package edu.gcc.subjecttochange.models;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.javalin.http.Context;



@JsonInclude(JsonInclude.Include.NON_NULL)
public class Student extends Person {

    @JsonProperty("id")
    public String id;
    @JsonProperty("major")
    public String major;
    @JsonProperty("year")
    public int year;

    @JsonProperty("fallSchedule")
    public Schedule fallSchedule;
    @JsonProperty("springSchedule")
    public Schedule springSchedule;


    public static String getStudentId(Context context) {
        return context.header("studentId");
    }
}
