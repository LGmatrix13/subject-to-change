package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.Response;
import edu.gcc.subjecttochange.utilties.JWT;
import io.javalin.http.Context;

import java.sql.SQLException;

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
        boolean conflictFree = new Schedule(studentId, course.semester).conflictFree(course);
        if (conflictFree) {
            Database.update("""
                insert into "schedule"
                ("courseId", "studentId")
                values (?, ?);
            """, course.id, studentId);
            Response.send(Response.OK, context, String.format("Added %s to student schedule", course.name));
            return;
        }
                            
        Response.send(Response.BAD_REQUEST, context, "Course conflicts with current schedule");
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
        Response.send(Response.OK, context, String.format("Removed %s from student schedule", course.name));
    }
}
