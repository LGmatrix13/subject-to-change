package edu.gcc.subjecttochange;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.gcc.subjecttochange.controllers.CoursesController;
import edu.gcc.subjecttochange.controllers.ProfessorsController;
import edu.gcc.subjecttochange.controllers.ScheduleController;
import edu.gcc.subjecttochange.controllers.SearchController;
import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.Javalin;

import java.io.File;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        var app = Javalin.create(/*config*/)
                .get("/", context -> context.result("subject to change"))
                .get("/schedule/fall", ScheduleController::getFallSchedule)
                .get("/schedule/spring", ScheduleController::getSpringSchedule)
                .post("/courses", CoursesController::postCourses)
                .delete("/courses", CoursesController::deleteCourses)
                .get("/search", SearchController::getSearch)
                .get("/professor", ProfessorsController::getProfessors);
        app.events(event -> {
            event.serverStarted(Main::seedDatastore);
            event.serverStopped(Main::backupDatastore);
        });
        app.exception(Exception.class, (e, context) -> {
            System.err.println(e.getMessage());
            context.status(400);
        });
        app.start(7070);
    }

    public static void seedDatastore() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            File coursesJson = new File("src/main/java/edu/gcc/subjecttochange/data/courses.json");
            Course[] courses = objectMapper.readValue(coursesJson, Course[].class);

            Datastore.courses.addAll(List.of(courses));
            File studentsJson = new File("src/main/java/edu/gcc/subjecttochange/data/students.json");
            Student[] students = objectMapper.readValue(studentsJson, Student[].class);
            Datastore.students.addAll(List.of(students));
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public static void backupDatastore() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            File studentsJson = new File("src/main/java/edu/gcc/subjecttochange/data/students.json");
            objectMapper.writeValue(studentsJson, Datastore.students);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
