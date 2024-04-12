package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.dtos.StudentDto;
import io.javalin.http.Context;

import java.util.Objects;


public class Student extends StudentDto {
    public static Integer getStudentId(Context context) {
        try {
            return Integer.parseInt(Objects.requireNonNull(context.header("studentId")));
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
