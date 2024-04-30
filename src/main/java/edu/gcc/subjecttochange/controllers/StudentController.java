package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.ActivityDto;
import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.dtos.ScheduleDto;
import edu.gcc.subjecttochange.models.Events;
import edu.gcc.subjecttochange.models.Schedule;
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
        List<CourseDto> courseDtos = Database.query( """
            select c."id", c."department", c."number", c."semester", c."hours", 
            c."name", c."startTime", c."endTime", c."weekday", c."section", c."seats", 
            p."firstName" "professorFirstName", p."lastName" "professorLastName"
            from schedule s
            join course c on s."courseId" = c."id"
            join professor p on p."id" = c."professorId"
            where s."studentId" = ?;
        """, CourseDto.class, studentId);
        ScheduleDto scheduleDto = new Schedule(courseDtos);
        Response.send(200, context, scheduleDto);
    }
}
