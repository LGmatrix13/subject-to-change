package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Person;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

public class WelcomeController {
    public static void postWelcome(Context context) {
        Student student = context.bodyAsClass(Student.class);
        Datastore.students.add(student);
        context.json(student);
        context.status(200);
    }
}
