package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.dtos.ProfessorDto;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.List;

/**
 * HTTP logic for suggested courses logic
 */
public class SuggestedController {
    private static final Logger logger = LoggerFactory.getLogger(SuggestedController.class);

    /**
     * HTTP logic for getting suggested courses
     */
    public static void getSuggested(Context context) throws SQLException {
        // get student id from request
        Integer studentId = Student.getStudentId(context);

        // if student exists, proceed
        if (studentId != null) {
            BeanListHandler<CourseDto> handler = new BeanListHandler<>(CourseDto.class);
            QueryRunner queryRunner = new QueryRunner();
            String sql = """
                select * from "course"
                where "department" = (
                    select "department" from "student"
                    where "id" = ?                    
                ) and "id" not exists (
                    select "courseId" from "schedule"
                    where "studentId" = ?
                )  
                limit 10  
            """;
            List<CourseDto> courseDtos = queryRunner.query(Database.connect(), sql, handler, studentId, studentId);
            Response.send(200, context, courseDtos);
            return;
        }

        // otherwise notify the student a schedule could not be generated
        Response.send(400, context, "Could not generate student schedule");
    }
}
