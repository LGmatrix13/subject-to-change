package edu.gcc.subjecttochange;

import edu.gcc.subjecttochange.controllers.*;
import edu.gcc.subjecttochange.utilties.JWT;
import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import io.javalin.plugin.bundled.CorsPluginConfig;
import io.jsonwebtoken.JwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;

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
        app.get("/api/courses", CoursesController::getCourses);
        app.get("/api/suggested", SuggestedController::getSuggested);
        app.post("/api/auth/login", AuthController::postLogin);
        app.post("/api/auth/register", AuthController::postRegister);
        app.get("/api/student", StudentController::getStudent);
        app.get("/api/professors", ProfessorsController::getProfessors);
        app.get("/api/activity", ActivityController::getActivity);
        app.post("/api/activity", ActivityController::postActivity);
        app.delete("/api/activity", ActivityController::deleteActivity);

        app.exception(JwtException.class, (e, context) -> {
            logger.warn("Unauthorized request attempted", e);
            context.result("Unauthorized");
            context.status(401);
        });
        app.exception(SQLException.class, (e, context) -> {
            logger.warn(e.getMessage(), e);
            context.result("Database error occurred");
            context.status(400);
        });
        app.exception(Exception.class, (e, context) -> {
            logger.warn(e.getMessage(), e);
            context.result("Something went wrong");
            context.status(400);
        });
    }
}
