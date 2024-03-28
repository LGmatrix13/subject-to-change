package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Professor;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.*;
import java.util.stream.Collectors;

public class ProfessorsController {
    public static void getProfessors(Context context) throws InterruptedException {
        Thread.sleep(1500);

        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        if (student.isPresent()) {
            Set<Professor> fallProfessors = student.get().fallSchedule.stream().map(course -> course.professor).collect(Collectors.toSet());
            Set<Professor> springProfessors = student.get().springSchedule.stream().map(course -> course.professor).collect(Collectors.toSet());
            fallProfessors.addAll(springProfessors);
            context.json(fallProfessors);
            context.status(200);
        }

        context.status(400);
    }
}
