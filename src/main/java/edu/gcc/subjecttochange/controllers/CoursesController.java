package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.dtos.ScheduleDto;
import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

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
        Integer studentId = Student.getStudentId(context);
        // serialize the course to remove
        Course course = context.bodyAsClass(Course.class);

        if (studentId != null) {
            QueryRunner queryRunner = new QueryRunner();
            BeanListHandler<ScheduleDto> handler = new BeanListHandler<>(ScheduleDto.class);
            String sql = """
                insert into "schedule"
                ("courseId", "studentId")
                values (?, ?)
                returning *      
            """;
            queryRunner.insert(Database.connect(), sql, handler, String.format("%s%d%s%d", course.department, course.number, course.section, course.year), studentId);
            Response.send(200, context, "Added course to student schedule");
            return;
        }

        Response.send(400, context, String.format("Could not remove course %s %d", course.department, course.number));
    }

    /**
     * HTTP logic for deleting a course
     */
    public static void deleteCourses(Context context) throws SQLException {
        // get student id from request
        Integer studentId = Student.getStudentId(context);
        // serialize the course to remove
        Course course = context.bodyAsClass(Course.class);

        if (studentId != null) {
            QueryRunner queryRunner = new QueryRunner();
            BeanListHandler<ScheduleDto> handler = new BeanListHandler<>(ScheduleDto.class);
            String sql = """
                delete from "schedule"
                where "courseId" = ? and "studentId" = ?
                returning *       
            """;
            queryRunner.update(Database.connect(), sql, handler, String.format("%s%d%s%d", course.department, course.number, course.section, course.year), studentId);
            Response.send(200, context, "Removed course from student schedule");
            return;
        }

        Response.send(400, context, String.format("Could not remove course %s %d", course.department, course.number));
    }
}
