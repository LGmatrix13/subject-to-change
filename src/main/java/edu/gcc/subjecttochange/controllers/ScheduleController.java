package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class ScheduleController {
    public static void getFallSchedule(Context context) {
        int studentId = Student.getStudentId(context);
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
        int studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);
        if (student.isPresent()) {
            Schedule springSchedule = student.get().springSchedule;
            context.json(springSchedule);
            context.status(200);
            return;
        }

        context.status(404);
    }
}
