package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.utilties.Datastore;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

public class Search {

    public String department;
    public String name;
    public String startTime;
    public String endTime;
    public String day;
    public Integer number;


    public Search(HttpServletRequest request) {
        this.department = request.getParameter("department");
        this.name = request.getParameter("name");
        this.startTime = request.getParameter("startTime");
        this.endTime = request.getParameter("endTime");
        this.day = request.getParameter("day");
        this.number = Integer.parseInt(request.getParameter("number"));
    }

    public List<Course> run() {
        if (Datastore.searchHistory.containsKey(this)) {
            return Datastore.searchHistory.get(this);
        }

        Stream<Course> filteredCourses = Datastore.courses.stream();

        if (this.department != null && !this.department.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.department.equals(department));
        }

        if (this.number != null) {
            filteredCourses = filteredCourses.filter(item -> item.number == number);
        }

        if (this.name != null && !this.name.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.name.toLowerCase().contains(this.name.toLowerCase()));
        }
        
        if (this.startTime != null && !this.startTime.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.startTime.equals(startTime));
        }

        if (this.endTime != null && !this.endTime.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.endTime.equals(endTime));
        }
        
        if (this.day != null && !this.day.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.weekday.equals(day));
        }

        List<Course> result = filteredCourses.toList();
        Datastore.searchHistory.put(this, result);
        return result;
    }

    public List<Course> run(int limit) {
        return this.run().subList(0, limit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(department, name, startTime, endTime, day, number);
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
                Objects.equals(day, other.day) &&
                Objects.equals(number, other.number);
    }
}
