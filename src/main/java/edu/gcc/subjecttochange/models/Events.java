package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.gcc.subjecttochange.utilties.Response;

import java.util.ArrayList;
import java.util.List;

public class Events {
        @JsonIgnore
        private static final ArrayList<Activity> events = new ArrayList<Activity>();

        // add
        @JsonIgnore
        public static boolean addEvent(Activity a) {
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
        public static boolean equals(Events otherEvents){
                return events.equals(getEvents());
        }

        @JsonIgnore
        public static ArrayList<Activity> getEvents(){
                return events;
        }
}
