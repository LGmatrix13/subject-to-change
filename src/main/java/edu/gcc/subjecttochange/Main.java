package edu.gcc.subjecttochange;

import edu.gcc.subjecttochange.controllers.CoursesController;
import edu.gcc.subjecttochange.controllers.ProfessorsController;
import edu.gcc.subjecttochange.controllers.ScheduleController;
import edu.gcc.subjecttochange.controllers.SearchController;
import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {
        // seed datastore with students
        Datastore.students.add(new Student(1));
        Datastore.students.add(new Student(2));

        // seed datastore with courses
        Datastore.courses.add(new Course("COMP-350"));
        Datastore.courses.add(new Course("COMP-442"));
        Datastore.courses.add(new Course("COMP-325"));

        Javalin.create(/*config*/)
                .get("/schedule/fall", ScheduleController::getFallSchedule)
                .get("/schedule/spring", ScheduleController::getSpringSchedule)
                .post("/courses/{courseId}", CoursesController::postCourses)
                .delete("/courses/{courseId}", CoursesController::deleteCourses)
                .get("/search", SearchController::getSearch)
                .get("/professor", ProfessorsController::getProfessors)
                .start(7070);
    }
}
