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

        if (studentId != null) {
            List<Course> courses = Database.query("""
                select * from "course"
                join "schedule" on schedule."courseId" = course."id"
                where schedule."studentId" = ?;
            """, Course.class, studentId);
            boolean conflictFree = Schedule.conflictFree(courses, course);
            if (conflictFree) {
                Database.insert("""
                    insert into "schedule"
                    ("courseId", "studentId")
                    values (?, ?)
                    returning *;
                """, ScheduleDto.class, course.id, studentId);
                Database.update("""
                    update "course"
                    set "enrollment" = "enrollment" + 1
                    where "id" = ?
                    returning *;
                """, CourseDto.class, course.id);
                Response.send(200, context, String.format("Added %s %d to student schedule", course.name, course.number));
                return;
            }

            Response.send(400, context, "Course conflicts with current schedule");
        }

        Response.send(401, context);
    }

    /**
     * HTTP logic for deleting a course
     */
    public static void deleteCourses(Context context) throws SQLException {
        // get student id from request
        Integer studentId = JWT.decodeStudentId(context);
        // serialize the course to remove
        Course course = context.bodyAsClass(Course.class);

        if (studentId != null) {
            Database.update("""
                delete from "schedule"
                where "courseId" = ? and "studentId" = ?
                returning *;
            """, ScheduleDto.class, course.id, studentId);
            Response.send(200, context, "Removed course from student schedule");
            return;
        }

        Response.send(401, context);
    }
}
