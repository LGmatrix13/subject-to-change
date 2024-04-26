package edu.gcc.subjecttochange.models;


import java.util.ArrayList;
import java.util.List;

public class Schedule  {
    public static boolean conflictFree(List<Activity> activities, Activity a) {
        // Overloaded method to check for conflicts with Activities
        for (Activity existingActivity : activities) {
            if (a.conflictsWith(existingActivity)) {
                return false; // Conflict found, cannot add the activity
            }
        }

        // if the activity is a course and it's not full, add
        if(a instanceof Course)
        {
            Course c = (Course) a;
            return !c.isFull();
        }
        return true;
    }
}
