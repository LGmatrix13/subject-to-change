package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

public class CoursesController {

    static Logger logger = LoggerFactory.getLogger(CoursesController.class);
    public static void postCourses(Context context) {
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        if (student.isPresent()) {
            Course course = context.bodyAsClass(Course.class);
            Schedule schedule = course.semester == Course.Semester.FALL ? student.get().fallSchedule : student.get().springSchedule;

            if (schedule.add(course)) {
                String message = "Added course to student schedule";
                context.result(message);
                logger.info(message);
                context.status(200);
                return;
            }
        }

        context.result("Could not add course as it is either full or has conflicts with other courses");
        logger.info("Tried to add course, but could not add course as it is either full or has conflicts with other courses");
        context.status(400);
    }

    public static void deleteCourses(Context context) {
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        if (student.isPresent()) {
            Course course = context.bodyAsClass(Course.class);
            Schedule schedule = course.semester == Course.Semester.FALL ? student.get().fallSchedule : student.get().springSchedule;

            if (schedule.remove(course)) {
                context.result("Removed course from student schedule");
                logger.info("Removed course from student schedule");
                context.status(200);
                return;
            }
        }

        context.result("Could not remove course");
        logger.info("Could not remove course");
        context.status(400);
    }
}
