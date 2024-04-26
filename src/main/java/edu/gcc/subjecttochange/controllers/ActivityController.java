package edu.gcc.subjecttochange.controllers;

import edu.gcc.subjecttochange.models.Activity;
import edu.gcc.subjecttochange.models.Events;
import edu.gcc.subjecttochange.models.Schedule;
import edu.gcc.subjecttochange.utilties.Database;
import edu.gcc.subjecttochange.utilties.Response;
import io.javalin.http.Context;

import java.util.ArrayList;

public class ActivityController{

    public static void addActivity(Context context){
        Activity activity = context.bodyAsClass(Activity.class);

        boolean conflictFree = Schedule.conflictFree(Events.getEvents(), activity);

        if (conflictFree) {
            Events.addEvent(activity);
            Response.send(200, context, String.format("Added %s to student schedule", activity.name));
            return;
        }

        Response.send(400, context, "Course conflicts with current schedule");
    }

    public static void removeActivity(Context context){
        Activity activity = context.bodyAsClass(Activity.class);
        Events.removeEvent(activity);
        Response.send(200, context, activity);
    }

    public static void getActivity(Context context) {
        Events.getEvents();
        Response.send(200, context, Events.getEvents());
    }
}