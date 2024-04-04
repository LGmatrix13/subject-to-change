package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Professor;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.stream.Collectors;

public class ProfessorsController {

    static Logger logger = LoggerFactory.getLogger(ProfessorsController.class);
    public static void getProfessors(Context context) throws InterruptedException {
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        if (student.isPresent()) {
            Set<Professor> fallProfessors = student.get().fallSchedule.stream().map(course -> course.professor).collect(Collectors.toSet());
            Set<Professor> springProfessors = student.get().springSchedule.stream().map(course -> course.professor).collect(Collectors.toSet());
            fallProfessors.addAll(springProfessors);
            context.json(fallProfessors);
            logger.info("Professors successfully updated.");
            context.status(200);
        }

        //logger.info("Professors failed to updated.");
        context.status(400);
    }
}
