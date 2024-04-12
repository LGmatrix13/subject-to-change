package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.utilties.Cache;
import edu.gcc.subjecttochange.utilties.Database;
import jakarta.servlet.http.HttpServletRequest;

import java.sql.SQLException;
import java.util.List;
import java.util.Objects;

public class Search {
    public String department;
    public Integer number;
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


    /**
     * alternative constructor for generating suggested courses
     */
    public Search(String department, Course.Semester semester) {
        this.department = department;
        this.semester = semester;
    }

    public List<Course> run() throws SQLException {
        // see if the search result is cached
        if (Cache.searchHistory.containsKey(this)) {
            return Cache.searchHistory.get(this);
        }

        StringBuilder stringBuilder = new StringBuilder();
        // filter by semester
        if (this.semester != null) {
            stringBuilder.append(String.format("%s semester = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.semester));
        }
        // filter department
        if (this.department != null && !this.department.isEmpty()) {
            stringBuilder.append(String.format("%s department = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.department));
        }
        // filter by course number
        if (this.number != null) {
            stringBuilder.append(String.format("%s number = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.number));
        }
        // filter by name
        if (this.name != null && !this.name.isEmpty()) {
            stringBuilder.append(String.format("%s name = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.name.toUpperCase()));
        }
        // filter by start time
        if (this.startTime != null && !this.startTime.isEmpty()) {
            stringBuilder.append(String.format("%s \"startTime\" = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.startTime));
        }
        // filter by end time
        if (this.endTime != null && !this.endTime.isEmpty()) {
            stringBuilder.append(String.format("%s \"endTime\" = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.endTime));
        }
        // filter by weekday
        if (this.weekday != null && !this.weekday.isEmpty()) {
            stringBuilder.append(String.format("%s weekday = \"%s\" and", stringBuilder.isEmpty() ? "where" : "", this.weekday));
        }

        String sort = "";
        // order asc by popularity/enrollment
        if (this.orderBy != null && !this.orderBy.isEmpty() && this.orderBy.equals("asc")){
            sort = "order by enrollment acs";
        }
        // order desc by popularity/enrollment
        if (this.orderBy != null && !this.orderBy.isEmpty() && this.orderBy.equals("desc")){
            sort = "order by enrollment desc";
        }

        String sql = String.format("select * from course %s %s", stringBuilder.substring(0, stringBuilder.length() - 3), sort);
        List<Course> courses = Database.query(sql, Course.class);
        Cache.searchHistory.put(this, courses);
        return courses;
    }

    @Override
    public int hashCode() {
        return Objects.hash(department, name, startTime, endTime, weekday, number, orderBy, semester);
    }

    @Override
    public boolean equals(Object obj) {
        if (getClass() != obj.getClass()) {
            return false;
        }
        Search other = (Search) obj;
        return Objects.equals(department, other.department) &&
                Objects.equals(name, other.name) &&
                Objects.equals(startTime, other.startTime) &&
                Objects.equals(endTime, other.endTime) &&
                Objects.equals(weekday, other.weekday) &&
                Objects.equals(number, other.number) &&
                Objects.equals(orderBy,other.orderBy) &&
                this.semester == other.semester;
    }
}