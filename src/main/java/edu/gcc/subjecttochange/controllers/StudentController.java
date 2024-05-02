package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.ScheduleDto;
import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.JWT;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;

import java.sql.SQLException;

/**
 * HTTP logic for student logic
 */
public class StudentController {
    /**
     * HTTP logic for getting student data, namely their schedule
     */
    public static void getStudent(Context context) throws SQLException {
        Integer studentId = JWT.decodeStudentId(context);
        ScheduleDto scheduleDto = new Schedule(Database.query("""
            select c."id", c."department", c."number", c."semester", c."hours", 
            c."name", c."startTime", c."endTime", c."weekday", c."section", c."seats", 
            (select count(*) from schedule where "courseId" = c."id") enrolled, p."firstName" "professorFirstName", p."lastName" "professorLastName"
            from "course" c
            join "professor" p on p."id" = c."professorId"
            join "schedule" s on s."courseId" = c."id"
            where s."studentId" = ?;
        """, Course.class, studentId));
        Response.send(Response.OK, context, scheduleDto);
    }
}
