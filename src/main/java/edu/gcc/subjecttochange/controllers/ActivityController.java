package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Activity;
import edu.gcc.subjecttochange.models.Course;
import edu.gcc.subjecttochange.models.Events;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.JWT;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;

import java.sql.SQLException;
import java.util.List;

public class ActivityController{

    public static void postActivity(Context context) throws SQLException {
        Activity activity = context.bodyAsClass(Activity.class);
        Integer studentId = JWT.decodeStudentId(context);
        Schedule schedule = new Schedule(studentId);
        boolean conflictFree = schedule.conflictFree(activity) && Events.addEvent(activity);

        if (conflictFree) {
            Response.send(Response.OK, context, String.format("Added %s to student schedule", activity.name));
            return;
        }

        Response.send(400, context, "Course conflicts with current schedule");
    }

    public static void deleteActivity(Context context){
        Activity activity = context.bodyAsClass(Activity.class);
        Events.removeEvent(activity);
        Response.send(Response.OK, context, activity);
    }
}
