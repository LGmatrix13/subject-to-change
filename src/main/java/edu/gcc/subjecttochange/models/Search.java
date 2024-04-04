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


    /**
     * take a request's url params to store the necessary filters
     */
    public Search(HttpServletRequest request) {
        this.department = request.getParameter("department");
        this.name = request.getParameter("name");
        this.startTime = request.getParameter("startTime");
        this.endTime = request.getParameter("endTime");
        this.weekday = request.getParameter("weekday");
        String numberParameter = request.getParameter("number");
        this.orderBy = request.getParameter("orderBy");
        this.semester = Course.Semester.valueOf(request.getParameter("semester"));
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

    public List<Course> run() {
        // see if the search result is cached
        if (Datastore.searchHistory.containsKey(this)) {
            return Datastore.searchHistory.get(this);
        }

        // use functional streaming to run through each filter
        Stream<Course> filteredCourses = Datastore.courses.stream();

        // filter by semester
        if (this.semester != null) {
            filteredCourses = filteredCourses.filter(item -> item.semester == this.semester);
        }

        // filter department
        if (this.department != null && !this.department.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.department.equals(department));
        }

        // filter by course number
        if (this.number != null) {
            filteredCourses = filteredCourses.filter(item -> item.number == number);
        }

        // filter by name
        if (this.name != null && !this.name.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.name.toLowerCase().contains(this.name.toLowerCase()));
        }
        
        // filter by start time
        if (this.startTime != null && !this.startTime.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.startTime != null && item.startTime.equals(startTime));
        }

        // filter by end time
        if (this.endTime != null && !this.endTime.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> item.endTime != null && item.endTime.equals(endTime));
        }

        // filter by weekday
        if (this.weekday != null && !this.weekday.isEmpty()) {
            filteredCourses = filteredCourses.filter(item -> {
                if (item.weekday == null) return false;
                // logic so MTWF classes appear when weekDay is MWF or TR
                for (int i = 0; i < item.weekday.length(); i++) {
                    if (this.weekday.indexOf(item.weekday.charAt(i)) != -1) {
                        return true;
                    }
                }
                return false;
            });
        }

        // order asc by popularity/enrollment
        if(this.orderBy != null && !this.orderBy.isEmpty() && this.orderBy.equals("asc")){
            filteredCourses = filteredCourses.sorted(Comparator.comparingInt((Course c) -> c.seats - c.enrolled));
        }
        // order desc by popularity/enrollment
        if(this.orderBy != null && !this.orderBy.isEmpty() && this.orderBy.equals("desc")){
            filteredCourses = filteredCourses.sorted(Comparator.comparingInt((Course c) -> c.enrolled - c.seats));
        }


        // return search result and cache it for future use
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
