package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;


public class Events {
        @JsonIgnore
        private static final ArrayList<Activity> events = new ArrayList<>();

        // add
        @JsonIgnore
        public static boolean addEvent(Activity a) {
                a.startTime = String.format("2024-04-29 %s", a.startTime);
                a.endTime = String.format("2024-04-29 %s", a.endTime);

                // look for conflicts
                for (Activity existingActivity : events) {
                        if (existingActivity.conflictsWith(a)) {
                                return false; // Conflict found, cannot add the activity
                        }
                }

                return events.add(a);
        }

        @JsonIgnore
        public static void removeEvent(Activity a){
                events.remove(a);
        }

        @JsonIgnore
        public static ArrayList<Activity> getEvents(){
                return events;
        }
}
