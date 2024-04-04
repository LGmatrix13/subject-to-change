package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Professor;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.*;
import java.util.stream.Collectors;

/**
 * HTTP logic for geting professors relative to your schedule
 */
public class ProfessorsController {
    /**
     * HTTP logic for getting professors
     */
    public static void getProfessors(Context context) {
        // get student id from request
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        // if  student exists in the database, proceed
        if (student.isPresent()) {
            // get a distinct list of all of the professors in the fall and spring
            Set<Professor> fallProfessors = student.get().fallSchedule.stream().map(course -> course.professor).collect(Collectors.toSet());
            Set<Professor> springProfessors = student.get().springSchedule.stream().map(course -> course.professor).collect(Collectors.toSet());
            // union them
            fallProfessors.addAll(springProfessors);
            // return to UI
            context.json(fallProfessors);
            context.status(200);
        }

        // provide unsucessful request otherwise
        context.status(400);
    }
}
