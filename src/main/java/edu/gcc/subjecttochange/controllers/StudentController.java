package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

/**
 * HTTP logic for student logic
 */
public class StudentController {
    private static Logger logger = LoggerFactory.getLogger(StudentController.class);

    /**
     * HTTP logic for getting student data, namely their schedule
     */
    public static void getStudent(Context context) {
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.students.stream().filter(item -> item.id.equals(studentId)).findFirst();

        if (student.isPresent()) {
            context.json(student.get());
            logger.info("Student succesfully found");
            context.status(200);
            return;
        }
        logger.info("Student not found");
        context.status(400);
    }

    public static void postStudent(Context context) {
        Student student = context.bodyAsClass(Student.class);
        Datastore.students.add(student);
        logger.info("Student has been added to the data base");
        context.json(student);
        context.status(200);
    }
}
