package edu.gcc.subjecttochange;

import edu.gcc.subjecttochange.controllers.*;
import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import io.javalin.plugin.bundled.CorsPluginConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {
    private static final Logger logger = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(CorsPluginConfig.CorsRule::anyHost);
            });
            config.staticFiles.add("src/main/app/dist", Location.EXTERNAL);
            config.spaRoot.addFile("/", "src/main/app/dist/index.html", Location.EXTERNAL);
        }).start(7070);

        app.post("/api/courses", CoursesController::postCourses);
        app.delete("/api/courses", CoursesController::deleteCourses);
        app.get("/api/suggested", SuggestedController::getSuggested);
        app.post("/api/student", StudentController::postStudent);
        app.get("/api/search", SearchController::getSearch);
        app.get("/api/student", StudentController::getStudent);
        app.get("/api/professors", ProfessorsController::getProfessors);

        app.exception(Exception.class, (e, context) -> {
            logger.warn(e.getMessage(), e);
            context.result("Something wrong happened");
            context.status(400);
        });
    }
}
