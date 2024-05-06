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
        ScheduleDto scheduleDto = new Schedule(studentId);
        Response.send(Response.OK, context, scheduleDto);
    }
}
