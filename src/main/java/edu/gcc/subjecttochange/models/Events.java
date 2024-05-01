package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.gcc.subjecttochange.utilties.Response;

import java.util.ArrayList;

public class Events {
        @JsonIgnore
        private static ArrayList<Activity> events = new ArrayList<Activity>();

        // add
        @JsonIgnore
        public static void addEvent(Activity a) {
                // look for conflicts

                boolean conflictFree = Schedule.conflictFree(events, a);

                if (conflictFree) {
                        events.add(a);
                        //Response.send(200, context, String.format("Added %s to student schedule", a.name));
                        return;
                }

                //Response.send(400, context, "Course conflicts with current schedule");
        }

        @JsonIgnore
        public static void removeEvent(Activity a){
                events.remove(a);
        }

        @JsonIgnore
        public static boolean equals(Events otherEvents){
                return events.equals(otherEvents.getEvents());
        }

        @JsonIgnore
        public static ArrayList<Activity> getEvents(){
                return events;
        }

        // remove
        // equals
        // update


}
