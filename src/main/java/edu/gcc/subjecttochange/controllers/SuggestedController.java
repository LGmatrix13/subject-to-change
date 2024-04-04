package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Search;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.http.Context;

import java.util.List;
import java.util.Optional;

import static edu.gcc.subjecttochange.models.Course.Semester;

/**
 * HTTP logic for suggested courses logic
 */
public class SuggestedController {
    /**
     * HTTP logic for getting suggested courses
     */
    public static void getSuggested(Context context) {
        // get student id from request
        String studentId = Student.getStudentId(context);
        Optional<Student> student = Datastore.getStudent(studentId);

        // if student exists, proceed 
        if (student.isPresent()) {
            // get what semester the student wants suggested courses for
            Course.Semester semester = Course.Semester.valueOf(context.req().getParameter("semester"));
            // get search results for their major and the requested semester
            Search search = new Search(student.get().major, semester);

            // if fall or spring, filter the search results to not contain courses already taken
            List<Course> candidateCourses = null;
            switch (semester) {
                case FALL -> candidateCourses = search.run().stream().filter(
                        course -> !student.get().fallSchedule.contains(course)
                ).distinct().limit(7).toList();
                case SPRING -> candidateCourses = search.run().stream().filter(
                        course -> !student.get().springSchedule.contains(course)
                ).distinct().limit(7).toList();
            }

            // return results
            context.json(candidateCourses);
            context.status(200);
            return;
        }

        // otherwise notify the student a schedule could not be generated
        context.result("Could not generate student schedule");
        context.status(400);
    }
}
