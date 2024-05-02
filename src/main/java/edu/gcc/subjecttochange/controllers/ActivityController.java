package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Activity;
import edu.gcc.subjecttochange.models.Activities;
import edu.gcc.subjecttochange.models.Course;
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
        List<Course> courses = Database.query("""
            select c."id", c."department", c."number", c."semester", c."hours", 
            c."name", c."startTime", c."endTime", c."weekday", c."section", c."seats", 
            (select count(*) from schedule where "courseId" = c."id") enrolled 
            from "course" c
            join "schedule" s on s."courseId" = c."id"
            where s."studentId" = ?;
        """, Course.class, studentId);
        boolean conflictFree = activity.conflictFree(courses);

        if (conflictFree) {
            Activities.addEvent(activity);
            Response.send(Response.OK, context, String.format("Added %s to student schedule", activity.name));
            return;
        }

        Response.send(400, context, "Activity conflicts with current schedule");
    }

    public static void deleteActivity(Context context){
        Activity activity = context.bodyAsClass(Activity.class);
        Activities.removeEvent(activity);
        Response.send(Response.OK, context, "%s removed from schedule", activity.name);
    }
}
