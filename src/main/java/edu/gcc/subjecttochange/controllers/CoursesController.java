package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.dtos.ScheduleDto;
import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.Response;
import edu.gcc.subjecttochange.utilties.JWT;
import io.javalin.http.Context;

import java.sql.SQLException;
import java.util.List;

/**
 * HTTP logic for adding and removing courses to schedule
 */
public class CoursesController {

    /**
     * HTTP logic for adding a course
     */
    public static void postCourses(Context context) throws SQLException {
        // get student id from request
        Integer studentId = JWT.decodeStudentId(context);
        // serialize the course to remove
        Course course = context.bodyAsClass(Course.class);

        List<Course> courses = Database.query("""
            select c."id", c."department", c."number", c."semester", c."hours", 
            c."name", c."startTime", c."endTime", c."weekday", c."section", c."seats", 
            p."firstName" "professorFirstName", p."lastName" "professorLastName"
            from "course" c
            join "professor" p on p."id" = c."professorId"
            join "schedule" s on s."courseId" = c."id"
            where s."studentId" = ? and c."semester" = ?;
        """, Course.class, studentId, course.semester);
                                              
        boolean conflictFree = Schedule.conflictFree(courses, course);
                                              
        if (conflictFree) {
            Database.update("""
                insert into "schedule"
                ("courseId", "studentId")
                values (?, ?);
            """, course.id, studentId);
            Response.send(200, context, String.format("Added %s to student schedule", course.name));
            return;
        }
                            
        Response.send(400, context, "Course conflicts with current schedule");
    }

    /**
     * HTTP logic for deleting a course
     */
    public static void deleteCourses(Context context) throws SQLException {
        // get student id from request
        Integer studentId = JWT.decodeStudentId(context);
        // serialize the course to remove
        Course course = context.bodyAsClass(Course.class);
        Database.update("""
            delete from "schedule"
            where "courseId" = ? and "studentId" = ?;
        """, course.id, studentId);
        Response.send(200, context, String.format("Removed %s from student schedule", course.name));
    }
}
