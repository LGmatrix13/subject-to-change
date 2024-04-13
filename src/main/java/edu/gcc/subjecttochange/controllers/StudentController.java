package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.dtos.StudentDto;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.JWT;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;

import java.sql.SQLException;
import java.util.List;

/**
 * HTTP logic for student logic
 */
public class StudentController {
    /**
     * HTTP logic for getting student data, namely their schedule
     */
    public static void getStudent(Context context) throws SQLException {
        Integer studentId = JWT.decodeStudentId(context);

        if (studentId != null) {
            List<CourseDto> courseDtos = Database.query( """
                select course."id", course."name", course."number", course."section", course."startTime", course."endTime", course."weekday", course."semester"
                from course
                join schedule on schedule."courseId" = course."id"
                where schedule."studentId" = ?;
            """, CourseDto.class, studentId);
            Response.send(200, context, courseDtos);
            return;
        }

        Response.send(401, context);
    }

    public static void postStudentRegister(Context context) throws SQLException {
        StudentDto studentDto = context.bodyAsClass(StudentDto.class);
        Database.update("""
            insert into student
            ("firstName", "lastName", "email", "major", "password", "year")
            values (?, ?, ?, ?, ?, ?);
        """, studentDto.firstName, studentDto.lastName, studentDto.email, studentDto.major, studentDto.password, studentDto.year);
        Response.send(200, context, studentDto, "Student has been added to the database");
    }

    public static void postStudentLogin(Context context) throws SQLException {
        StudentDto studentDto = context.bodyAsClass(StudentDto.class);
        List<StudentDto> studentDtos = Database.query("""
            select * from student
            where "email" = ? and "password" = ? 
            limit 1;
        """, StudentDto.class, studentDto.email, studentDto.password);

        if (!studentDtos.isEmpty()) {
            Response.send(200, context, JWT.generate(studentDtos.getFirst().id));
        } else {
            Response.send(401, context);
        }
    }
}
