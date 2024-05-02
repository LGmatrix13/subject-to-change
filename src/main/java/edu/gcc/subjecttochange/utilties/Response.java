package edu.gcc.subjecttochange.utilties;

import edu.gcc.subjecttochange.controllers.CoursesController;
import io.javalin.http.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Response {
    public static final int OK = 200;
    public static final int BAD_REQUEST = 400;
    public static final int UNAUTHORIZED = 401;
    private static final Logger logger = LoggerFactory.getLogger(Response.class);

    public static void send(int status, Context context) {
        context.status(status);
    }
    public static void send(int status, Context context, String message) {
        if (status != 200) {
            logger.warn(message);
        } else {
            logger.info(message);
        }
        context.result(message);
        context.status(status);
    }

    public static void send(int status, Context context, Object object) {
        context.json(object);
        context.status(status);
    }

    public static void send(int status, Context context, Object object, String logMessage) {
        if (status != 200) {
            logger.warn(logMessage);
        } else {
            logger.info(logMessage);
        }
        context.json(object);
        context.status(status);
    }
}
