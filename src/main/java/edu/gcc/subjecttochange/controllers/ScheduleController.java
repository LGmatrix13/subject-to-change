package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.ArrayList;
import java.util.Optional;

public class ScheduleController {
    public static void getFallSchedule(Context context) {
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);
        if (student.isPresent()) {
            Schedule fallSchedule = student.get().fallSchedule;
            context.json(fallSchedule);
            context.status(200);
            return;
        }

        context.status(404);
    }

    public static void getSpringSchedule(Context context) {
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);
        if (student.isPresent()) {
            ArrayList<Course> springSchedule = student.get().springSchedule;
            context.json(springSchedule);
            context.status(200);
            return;
        }

        context.status(404);
    }
}
