package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.Optional;

/**
 * HTTP logic for student logic
 */
public class StudentController {
    /**
     * HTTP logic for getting student data, namely their schedule
     */
    public static void getStudent(Context context) {
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.students.stream().filter(item -> item.id.equals(studentId)).findFirst();

        if (student.isPresent()) {
            context.json(student.get());
            context.status(200);
            return;
        }

        context.status(400);
    }

    public static void postStudent(Context context) {
        Student student = context.bodyAsClass(Student.class);
        Datastore.students.add(student);
        context.json(student);
        context.status(200);
    }
}
