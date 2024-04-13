package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;

import java.sql.SQLException;
import java.util.List;

/**
 * HTTP logic for suggested courses logic
 */
public class SuggestedController {
    /**
     * HTTP logic for getting suggested courses
     */
    public static void getSuggested(Context context) throws SQLException {
        // get student id from request
        Integer studentId = Student.getStudentId(context);

        // if student exists, proceed
        if (studentId != null) {
            List<CourseDto> courseDtos = Database.query("""
                select * from "course"
                where "department" = (
                    select "major" from "student"
                    where "id" = ?                    
                ) and "name" != (
                    select "name" from "course"
                    join "schedule" on schedule."courseId" = course."id" 
                    where "studentId" = ?
                );  
            """, CourseDto.class, studentId, studentId);
            Response.send(200, context, courseDtos);
            return;
        }

        // otherwise notify the student a schedule could not be generated
        Response.send(400, context, "Could not generate student schedule");
    }
}
