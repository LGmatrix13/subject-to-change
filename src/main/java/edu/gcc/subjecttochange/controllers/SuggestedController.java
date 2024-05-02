package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.JWT;
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
        Integer studentId = JWT.decodeStudentId(context);
        String semester = context.req().getParameter("semester");
        // if student exists, proceed

        List<CourseDto> courseDtos = Database.query("""
            select c."department", c."number", c."semester", c."hours", 
            c."name", c."startTime", c."endTime", c."weekday", c."section", c."seats", 
            (select count(*) from schedule where "courseId" = c."id") enrolled, p."firstName" "professorFirstName", p."lastName" "professorLastName"
            from course c
            join professor p on c."professorId" = p."id"
            where c."department" = (
                select "major" from "student"
                where "id" = ?                    
            ) and c."name" != (
                select "name" from "course" c
                join "schedule" s on s."courseId" = c."id" 
                where s."studentId" = ?
            ) and c."semester" = ?;  
        """, CourseDto.class, studentId, studentId, semester);
        Response.send(Response.OK, context, courseDtos);
    }
}
