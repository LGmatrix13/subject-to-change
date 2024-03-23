package edu.gcc.subjecttochange;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.gcc.subjecttochange.controllers.*;
import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Student;
import edu.gcc.subjecttochange.utilties.Datastore;
import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import io.javalin.plugin.bundled.CorsPluginConfig;

import java.io.File;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        seedDatastore();
        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(CorsPluginConfig.CorsRule::anyHost);
            });
            config.staticFiles.add("src/main/app/dist", Location.EXTERNAL);
            config.spaRoot.addFile("/", "src/main/app/dist/index.html", Location.EXTERNAL);
        }).start(7070);

        app.post("/api/courses", CoursesController::postCourses);
        app.delete("/api/courses", CoursesController::deleteCourses);
        app.get("/api/search", SearchController::getSearch);
        app.get("/api/suggested", SuggestedController::getSuggested);
        app.post("/api/student", StudentController::postStudent);
        app.get("/api/student", StudentController::getStudent);
        app.get("/api/professors", ProfessorsController::getProfessors);

        app.exception(Exception.class, (e, context) -> {
            System.err.println(e.getMessage());
            context.result("Something wrong happened");
            context.status(400);
        });
        app.events(event -> {
            event.serverStopped(Main::backupDatastore);
        });
        Runtime.getRuntime().addShutdownHook(new Thread(Main::backupDatastore));
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
        System.out.println("Seeded Datastore");
    }

    public static void backupDatastore() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            File studentsJson = new File("src/main/java/edu/gcc/subjecttochange/data/students.json");
            objectMapper.writeValue(studentsJson, Datastore.students);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        System.out.println("Backed up Datastore");
    }
}
