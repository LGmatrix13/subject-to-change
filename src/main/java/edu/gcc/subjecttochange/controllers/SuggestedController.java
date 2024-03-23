package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Search;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.List;
import java.util.Optional;

public class SuggestedController {
    public static void getSuggested(Context context) {
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        if (student.isPresent()) {
            Search search = new Search(student.get().major);
            List<Course> candidateCourses = search.run().stream().filter(
                course -> !student.get().fallSchedule.contains(course) && !student.get().springSchedule.contains(course)
            ).distinct().limit(7).toList();
            context.json(candidateCourses);
            context.status(200);
            return;
        }

        context.result("Could not generate student schedule");
        context.status(400);
    }
}
