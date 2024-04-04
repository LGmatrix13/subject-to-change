package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.Optional;

/**
 * HTTP logic for adding and removing courses to schedule
 */
public class CoursesController {
    /**
     * HTTP logic for adding a course
     */
    public static void postCourses(Context context) {
        // get student id from request
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        // if student exists in the database, proceed
        if (student.isPresent()) {
            // serialize the course to add
            Course course = context.bodyAsClass(Course.class);
            Schedule schedule = course.semester == Course.Semester.FALL ? student.get().fallSchedule : student.get().springSchedule;

            // add course to the appropiate schedule
            if (schedule.add(course)) {
                context.result("Added course to student schedule");
                context.status(200);
                return;
            }
        }

        // otherwise notify study the course could not be added
        context.result("Could not add course as it is either full or has conflicts with other courses");
        context.status(400);
    }

    /**
     * HTTP logic for deleting a course
     */
    public static void deleteCourses(Context context) {
        // get student id from request
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        if (student.isPresent()) {
            // serialize the course to remove
            Course course = context.bodyAsClass(Course.class);
            Schedule schedule = course.semester == Course.Semester.FALL ? student.get().fallSchedule : student.get().springSchedule;

            // removoe course from schedule
            if (schedule.remove(course)) {
                context.result("Removed course from student schedule");
                context.status(200);
                return;
            }
        }

        // otherwise, notify student the course coudld not be removed
        context.result("Could not remove course");
        context.status(400);
    }
}
