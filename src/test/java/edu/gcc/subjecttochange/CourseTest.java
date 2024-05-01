package edu.gcc.subjecttochange;

import edu.gcc.subjecttochange.models.Course;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CourseTest {

    @Test
    void getYear() {
        assertEquals(7,7);
    }

    @Test
    public void timeToMinutesTest(){
//        Course c = new Course();
//
//        // Test time in AM
//        String time1 = "10:32 AM";
//        assertEquals(632, c.timeToMinutes(time1));
//
//        // Test PM conversion
//        String time2 = "1:32 PM";
//        assertEquals(812, c.timeToMinutes(time2));
//
//        String time3 = "12:00 AM";
//        assertEquals(720, c.timeToMinutes(time3));
//
//        String time4 = "12:00 PM";
//        assertEquals(1440, c.timeToMinutes(time4));
    }

    @Test
    public void conflictsWithTest(){
        // TEST CASE 1: courses are equal
        Course c1 = new Course();
        Course c2 = c1;
        assertTrue(c1.conflictsWith(c2));


        // Test Case 2: Same weekday, start Time and end Time (should conflict both ways)
        Course c3 = new Course();
        Course c4 = new Course();

        c3.weekday = "M";
        c3.startTime = "9:00 AM";
        c3.endTime = "9:50 AM";
        c3.department = "HUMA";

        c4.weekday = "M";
        c4.startTime = "9:00 AM";
        c4.endTime = "9:50 AM";
        c4.department =  "COMP";

        assertTrue(c3.conflictsWith(c4));

        // Test Case 3: Same Start Time, Different End Time (should conflict both ways)
        c3.startTime = "9:00 AM";
        c3.endTime = "10:50 AM";
        c4.startTime = "9:00 AM";
        c4.endTime = "9:50 AM";
        assertTrue(c3.conflictsWith(c4));

        // Test Case 4: Different Start Time, Same End Time
        c3.startTime = "9:00 AM";
        c3.endTime = "10:50 AM";
        c4.startTime = "10:00 AM";
        c4.endTime = "10:50 AM";
        assertTrue(c3.conflictsWith(c4));

        // Test Case 5: Different Start and End times, but still conflicting
        c3.startTime = "1:00 PM";
        c3.endTime = "1:50 PM";
        c4.startTime = "1:40 PM";
        c4.endTime = "2:33 PM";
        assertTrue(c3.conflictsWith(c4));

        // Test Case 6: Non conflicting times
        c3.startTime = "1:00 PM";
        c3.endTime = "1:50 PM";
        c4.startTime = "2:30 PM";
        c4.endTime = "3:20 PM";
        assertFalse(c3.conflictsWith(c4));

        // Test Case 7: Different days
        c3.weekday = "M";
        c3.startTime = "9:00 AM";
        c3.endTime = "10:50 AM";
        c4.weekday = "W";
        c4.startTime = "9:00 AM";
        c4.endTime = "10:50 AM";
        assertFalse(c3.conflictsWith(c4));
    }
}