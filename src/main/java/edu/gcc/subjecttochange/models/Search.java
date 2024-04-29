package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.utilties.Database;
import jakarta.servlet.http.HttpServletRequest;

import java.sql.SQLException;
import java.util.List;
import java.util.Objects;

public class Search {
    public String department;
    public Integer number;
    public String professor;
    public String name;
    public String startTime;
    public String endTime;
    public String weekday;
    public String orderBy;
    public Course.Semester semester;


    /**
     * take a request's url params to store the necessary filters
     */
    public Search(HttpServletRequest request) {
        this.department = request.getParameter("department");
        this.professor = request.getParameter("professor");
        this.name = request.getParameter("name");
        this.startTime = request.getParameter("startTime");
        this.endTime = request.getParameter("endTime");
        this.weekday = request.getParameter("weekday");
        this.orderBy = request.getParameter("orderBy");

        String numberParameter = request.getParameter("number");
        String semester = request.getParameter("semester");

        if (semester != null && !semester.isEmpty()) {
            this.semester = Course.Semester.valueOf(semester);
        }

        // conver the course number filter and covert it to the ints
        if (numberParameter != null && !numberParameter.isEmpty()) {
            this.number = Integer.valueOf(numberParameter);
        }
    }


    public List<Course> run() throws SQLException {
        StringBuilder stringBuilder = new StringBuilder();
        // filter by semester
        if (this.semester != null) {
            stringBuilder.append(String.format("%s semester = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.semester));
        }
        // filter department
        if (this.department != null && !this.department.isEmpty()) {
            stringBuilder.append(String.format("%s c.department = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.department));
        }
        // filter by course number
        if (this.number != null) {
            stringBuilder.append(String.format("%s number = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.number));
        }
        // filter by name
        if (this.name != null && !this.name.isEmpty()) {
            stringBuilder.append(String.format("%s lower(name) like lower(\"%%%s%%\") and", stringBuilder.isEmpty() ? "where" : "", this.name));
        }
        if (this.professor != null && !this.professor.isEmpty()) {
            stringBuilder.append(String.format("%s lower(p.\"firstName\") like lower(\"%%%s%%\") or lower(p.\"lastName\") like lower(\"%%%s%%\") and", stringBuilder.isEmpty() ? "where" : "", this.professor, this.professor));
        }
        // filter by start time
        if (this.startTime != null && !this.startTime.isEmpty()) {
            stringBuilder.append(String.format("%s strftime(\"%%I:%%M %%p\", \"%s\") <= \"startTime\" and", stringBuilder.isEmpty() ? "where" : "", this.startTime));
        }
        // filter by end time
        if (this.endTime != null && !this.endTime.isEmpty()) {
            stringBuilder.append(String.format("%s strftime(\"%%I:%%M %%p\", \"%s\") >= \"endTime\" and", stringBuilder.isEmpty() ? "where" : "", this.endTime));
        }
        // filter by weekday
        if (this.weekday != null && !this.weekday.isEmpty()) {
            if (this.weekday.equals("MWF")) {
                stringBuilder.append(String.format("%s weekday like \"%%M%%\" or weekday like \"%%W%%\" or weekday like \"%%F%%\" and", stringBuilder.isEmpty() ? "where" : ""));
            } else {
                stringBuilder.append(String.format("%s weekday like \"%%T%%\" or weekday like \"%%R%%\" and", stringBuilder.isEmpty() ? "where" : ""));
            }
        }

        String sort = "";
        // order asc by popularity/enrollment
        if (this.orderBy != null && !this.orderBy.isEmpty()){
            sort = String.format("order by c.enrolled %s", this.orderBy);
        }

        String sql = String.format("""
                select c."id", c."department", c."number", c."semester", c."hours", 
                c."name", c."startTime", c."endTime", c."weekday", c."section", c."seats", 
                p."firstName" "professorFirstName", p."lastName" "professorLastName", (select count(*) from "schedule" where "courseId" = c."id") "enrolled"
                from course c
                join professor p on p."id" = c."professorId"
                %s %s
        """, stringBuilder.substring(0, stringBuilder.length() - 3), sort);
        return Database.query(sql, Course.class);
    }
}