package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.Optional;

public class CoursesController {
    public static void postCourses(Context context) {
        int studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        if (student.isPresent()) {
            Course course = context.bodyAsClass(Course.class);
            Schedule schedule = course.semester == Course.Semester.FALL ? student.get().fallSchedule : student.get().springSchedule;
            boolean success = schedule.addCourse(course);

            if (success) {
                context.result("Added course to student schedule");
                context.status(200);
                return;
            }
        }

        context.status(400);
    }

    public static void deleteCourses(Context context) {
        int studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        if (student.isPresent()) {
            Course course = context.bodyAsClass(Course.class);
            Schedule schedule = course.semester == Course.Semester.FALL ? student.get().fallSchedule : student.get().springSchedule;
            schedule.removeCourse(course);
            context.result("Removed course from student schedule");
            context.status(200);
            return;
        }

        context.status(400);
    }
}
