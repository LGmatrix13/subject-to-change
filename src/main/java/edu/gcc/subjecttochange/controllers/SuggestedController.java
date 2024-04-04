package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Search;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

public class SuggestedController {

    static Logger logger = LoggerFactory.getLogger(SuggestedController.class);
    public static void getSuggested(Context context) throws InterruptedException {
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);


        if (student.isPresent()) {
            Course.Semester semester = Course.Semester.valueOf(context.req().getParameter("semester"));
            Search search = new Search(student.get().major, semester);

            List<Course> candidateCourses = null;
            switch (semester) {
                case FALL -> candidateCourses = search.run().stream().filter(
                        course -> !student.get().fallSchedule.contains(course)
                ).distinct().limit(7).toList();
                case SPRING -> candidateCourses = search.run().stream().filter(
                        course -> !student.get().springSchedule.contains(course)
                ).distinct().limit(7).toList();
            }

            context.json(candidateCourses);
            logger.info("suggested schedule loads successfully");
            context.status(200);
            return;
        }

        context.result("Could not generate student schedule");
        logger.info("Failed to generate student schedule");
        context.status(400);
    }
}
