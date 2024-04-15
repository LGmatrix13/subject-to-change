package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.ProfessorDto;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.JWT;
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
        Integer studentId = JWT.decodeStudentId(context);

        // if  student exists in the database, proceed
        if (studentId != null) {
            List<ProfessorDto> professorDtos = Database.query("""
                select distinct p."firstName", p."lastName", p."department"
                from student s
                join schedule sc on s."id" = sc."studentId"
                join course c on sc."courseId" = c."id"
                join professor p on c."professorId" = p."id"
                where s.id = ?;
            """, ProfessorDto.class, studentId);
            Response.send(200, context, professorDtos);
        }

        Response.send(401, context);
    }
}
