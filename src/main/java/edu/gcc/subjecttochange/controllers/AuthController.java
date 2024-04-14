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
        Response.send(200, context, studentDto, JWT.generate(studentDto.id));
    }

    public static void postLogin(Context context) throws SQLException {
        StudentDto studentDto = context.bodyAsClass(StudentDto.class);
        List<StudentDto> studentDtos = Database.query("""
            select * from student
            where "email" = ? and "password" = ? 
            limit 1;
        """, StudentDto.class, studentDto.email, studentDto.password);

        if (!studentDtos.isEmpty()) {
            Response.send(200, context, JWT.generate(studentDtos.getFirst().id));
        } else {
            Response.send(401, context, "Invalid credentials");
        }
    }
}
