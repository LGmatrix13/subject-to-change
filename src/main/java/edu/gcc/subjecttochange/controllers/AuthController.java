package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.StudentDto;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.JWT;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;

import java.sql.SQLException;
import java.util.List;

public class AuthController {
    public static void postRegister(Context context) throws SQLException {
        StudentDto studentDto = context.bodyAsClass(StudentDto.class);
        Database.update("""
            insert into student
            ("firstName", "lastName", "email", "major", "password")
            values (?, ?, ?, ?, ?);
        """, studentDto.firstName, studentDto.lastName, studentDto.email, studentDto.major, studentDto.password);
        StudentDto loggedInStudentDto = Database.query("""
            select * from student s
            where s."email" = ? and s."password" = ?
            limit 1
        """, StudentDto.class, studentDto.email, studentDto.password).getFirst();
        loggedInStudentDto.jwt = JWT.generate(loggedInStudentDto.id);
        Response.send(Response.OK, context, loggedInStudentDto);
    }

    public static void postLogin(Context context) throws SQLException {
        StudentDto studentDto = context.bodyAsClass(StudentDto.class);
        List<StudentDto> studentDtos = Database.query("""
            select * from student s
            where s."email" = ? and s."password" = ? 
            limit 1;
        """, StudentDto.class, studentDto.email, studentDto.password);

        if (!studentDtos.isEmpty()) {
            StudentDto loggedInStudentDto = studentDtos.getFirst();
            loggedInStudentDto.jwt = JWT.generate(loggedInStudentDto.id);
            Response.send(Response.OK, context, loggedInStudentDto);
        } else {
            Response.send(Response.UNAUTHORIZED, context, "Invalid credentials");
        }
    }
}
