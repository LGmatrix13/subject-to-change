package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.utilties.Datastore;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

public class Search {

    public String department;
    public String name;
    public String time;
    public String day;


    public Search(
        String department,
        String name,
        String time,
        String day
    ) {
        this.department = department;
        this.name = name;
        this.time = time;
        this.day = day;
    }

    public List<Course> run() {
        if (Datastore.searchHistory.containsKey(this)) {
            return Datastore.searchHistory.get(this);
        }

        Stream<Course> filteredCourses = Datastore.courses.stream();
        if (this.department != null) {
            filteredCourses = filteredCourses.filter(item -> item.department.equals(department));
        }
        if (this.name != null) {
            filteredCourses = filteredCourses.filter(item -> item.name.toLowerCase().contains(this.name.toLowerCase()));
        }
        // TODO: use the previous filteredCourses to do the rest of the filters
        if (this.time != null) {

        }
        if (this.day != null) {

        }

        List<Course> result = filteredCourses.toList();
        Datastore.searchHistory.put(this, result);
        return result;
    }

    @Override
    public int hashCode() {
        return Objects.hash(department, name, time, day);
    }

    @Override
    public boolean equals(Object obj) {
        if (getClass() != obj.getClass()) {
            return false;
        }
        Search other = (Search) obj;
        return Objects.equals(department, other.department) &&
                Objects.equals(name, other.name) &&
                Objects.equals(time, other.time) &&
                Objects.equals(day, other.day);
    }
}
