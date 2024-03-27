package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.utilties.Datastore;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

public class Search {

    public String department;
    public Integer number;
    public String name;
    public String startTime;
    public String endTime;
    public String weekday;
    public String orderBy;
    public Course.Semester semester;


    public Search(HttpServletRequest request) {
        this.department = request.getParameter("department");
        this.name = request.getParameter("name");
        this.startTime = request.getParameter("startTime");
        this.endTime = request.getParameter("endTime");
        this.weekday = request.getParameter("weekday");
        String numberParameter = request.getParameter("number");
        this.orderBy = request.getParameter("orderBy");
        this.semester = Course.Semester.valueOf(request.getParameter("semester"));
        if (numberParameter != null && !numberParameter.isEmpty()) {
            this.number = Integer.valueOf(numberParameter);
        }
    }

    public Search(String department, Course.Semester semester) {
        this.department = department;
        this.semester = semester;
    }

    public List<Course> run() {
        if (Datastore.searchHistory.containsKey(this)) {
            return Datastore.searchHistory.get(this);
        }

        Stream<Course> filteredCourses = Datastore.courses.stream();

        if (this.semester != null) {
            filteredCourses = filteredCourses.filter(item -> item.semester == this.semester);
        }

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
            filteredCourses = filteredCourses.filter(item -> item.startTime != null && item.startTime.equals(startTime));
        }

        if (this.endTime != null && !this.endTime.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.endTime != null && item.endTime.equals(endTime));
        }

        if (this.weekday != null && !this.weekday.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.weekday != null && item.weekday.equals(weekday));
        }

        if(this.orderBy != null && !this.orderBy.isEmpty() && this.orderBy.equals("asc")){
            filteredCourses = filteredCourses.sorted(Comparator.comparingInt((Course c) -> c.seats - c.enrolled));
        }
        if(this.orderBy != null && !this.orderBy.isEmpty() && this.orderBy.equals("desc")){
            filteredCourses = filteredCourses.sorted(Comparator.comparingInt((Course c) -> c.enrolled - c.seats));
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
