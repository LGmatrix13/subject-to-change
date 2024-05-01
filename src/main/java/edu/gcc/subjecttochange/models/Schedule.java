package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.dtos.ScheduleDto;
import edu.gcc.subjecttochange.utilties.Database;

import java.sql.SQLException;

public class Schedule extends ScheduleDto {
    public Schedule(Integer studentId) throws SQLException {
        this.courses = Database.query("""
            select c."id", c."department", c."number", c."semester", c."hours", 
            c."name", c."startTime", c."endTime", c."weekday", c."section", c."seats", 
            (select count(*) from schedule where "courseId" = c."id") enrolled, p."firstName" "professorFirstName", p."lastName" "professorLastName"
            from "course" c
            join "professor" p on p."id" = c."professorId"
            join "schedule" s on s."courseId" = c."id"
            where s."studentId" = ?;
        """, Course.class, studentId);
        this.events = Activities.getActivties();
    }
    public Schedule(Integer studentId, CourseDto.Semester semester) throws SQLException {
        this.courses = Database.query("""
            select c."id", c."department", c."number", c."semester", c."hours", 
            c."name", c."startTime", c."endTime", c."weekday", c."section", c."seats", 
            (select count(*) from schedule where "courseId" = c."id") enrolled, p."firstName" "professorFirstName", p."lastName" "professorLastName"
            from "course" c
            join "professor" p on p."id" = c."professorId"
            join "schedule" s on s."courseId" = c."id"
            where s."studentId" = ? and c."semester" = ?;
        """, Course.class, studentId, semester.toString());
        this.events = Activities.getActivties();
    }

    public boolean conflictFree(Course course) {
        // Overloaded method to check for conflicts with Activities
        for (Course existingCourse : this.courses) {
            if (existingCourse.conflictsWith(course)) {
                return false; // Conflict found, cannot add the activity
            }
        }

        // if the activity is a course and it's not full, add
        return !course.isFull();
    }

    public boolean conflictFree(Activity activity) {
        // Overloaded method to check for conflicts with Activities
        for (Course existingCourse : this.courses) {
            if (existingCourse.conflictsWith(activity)) {
                return false;
            }
        }

        // if the activity is a course and it's not full, add
        return true;
    }
}
