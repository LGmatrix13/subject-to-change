package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.ProfessorDto;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;

import java.sql.SQLException;
import java.util.List;

/**
 * HTTP logic for getting professors relative to your schedule
 */
public class ProfessorsController {
    /**
     * HTTP logic for getting professors
     */
    public static void getProfessors(Context context) throws SQLException {
        // get student id from request
        Integer studentId = Student.getStudentId(context);

        // if  student exists in the database, proceed
        if (studentId != null) {
            List<ProfessorDto> professorDtos = Database.query("""
                select professor."firstName", professor."lastName", professor."department"
                from student
                join schedule on student."id" = schedule."studentId"
                join course on schedule."courseId" = course."id"
                join professor on course."professorId" = professor."id"
                where student.id = ?;
            """, ProfessorDto.class, studentId);
            Response.send(200, context, professorDtos);
        }

        Response.send(400, context, "Failed to get professors");
    }
}
