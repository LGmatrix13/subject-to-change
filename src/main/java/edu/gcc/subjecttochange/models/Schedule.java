package edu.gcc.subjecttochange.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.gcc.subjecttochange.dtos.CourseDto;
import edu.gcc.subjecttochange.dtos.ScheduleDto;
import edu.gcc.subjecttochange.utilties.Database;

import java.sql.SQLException;
import java.util.List;

public class Schedule extends ScheduleDto {
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


    @JsonIgnore
    public boolean conflictFree(Course course) {
        for (Course existingCourse : this.courses) {
            if (!existingCourse.isOnline() && !course.isOnline() && existingCourse.conflictsWith(course)) {
                return false;
            }
        }

        for (Activity existingActivity : this.events) {
            if (!course.isOnline() && existingActivity.conflictsWith(course)) {
                return false;
            }
        }

        return !course.isFull();
    }

    @JsonIgnore
    public boolean conflictFree(Activity activity) {
        for (Course existingCourse : this.courses) {
            if (!existingCourse.isOnline() && existingCourse.conflictsWith(activity)) {
                return false;
            }
        }

        for (Activity existingActivity : this.events) {
            if (existingActivity.conflictsWith(activity)) {
                return false;
            }
        }

        return true;
    }
}
