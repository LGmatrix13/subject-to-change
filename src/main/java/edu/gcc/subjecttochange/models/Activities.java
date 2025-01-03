package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;


public class Activities {
        @JsonIgnore
        private static final ArrayList<Activity> activties = new ArrayList<>();

        // add
        @JsonIgnore
        public static boolean addEvent(Activity a) {
                // look for conflicts
                for (Activity existingActivity : activties) {
                        if (existingActivity.conflictsWith(a)) {
                                return false; // Conflict found, cannot add the activity
                        }
                }

                return activties.add(a);
        }

        @JsonIgnore
        public static void removeEvent(Activity a){
                activties.remove(a);
        }

        @JsonIgnore
        public static ArrayList<Activity> getActivties(){
                return activties;
        }


}
