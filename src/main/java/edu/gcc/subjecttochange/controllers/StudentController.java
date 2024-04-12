package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.dtos.StudentDto;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

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
        Integer studentId = Student.getStudentId(context);

        if (studentId != null) {
            List<CourseDto> courseDtos = Database.query( """
                select * from schedule
                join schedule on schedule."courseId" = course."id"
                where schedule."studentId" = ?
            """, CourseDto.class, studentId);
            Response.send(200, context, courseDtos);
            return;
        }

        Response.send(400, context, "Student not found");
    }

    public static void postStudent(Context context) throws SQLException {
        StudentDto studentDto = context.bodyAsClass(StudentDto.class);
        Database.insert("""
            insert into student
            ("name", "email", "major", "year")
            values (?, ?, ?, ?)
            returning *
        """, StudentDto.class, studentDto.name, studentDto.email, studentDto.major, studentDto.year).getFirst();
        Response.send(200, context, studentDto, "Student has been added to the database");
    }
}
