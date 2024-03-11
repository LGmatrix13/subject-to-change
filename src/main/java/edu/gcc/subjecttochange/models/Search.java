package edu.gcc.subjecttochange.models;

import edu.gcc.subjecttochange.utilties.Datastore;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

public class Search {
    public String code;
    public String name;
    public String time;
    public String day;


    public Search(
        String code,
        String name,
        String time,
        String day
    ) {
        this.code = code;
        this.name = name;
        this.time = time;
        this.day = day;
    }

    public List<Course> run() {
        if (Datastore.searchHistory.containsKey(this)) {
            return Datastore.searchHistory.get(this);
        }

        Stream<Course> filteredCourses = Datastore.courses.stream();
        if (this.code != null) {
            filteredCourses = filteredCourses.filter(item -> item.code.equals(this.code));
        }
        if (this.name != null) {
            filteredCourses = filteredCourses.filter(item -> item.name.contains(this.name));
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
        return Objects.hash(code, name, time, day);
    }

    @Override
    public boolean equals(Object obj) {
        if (getClass() != obj.getClass()) {
            return false;
        }
        Search other = (Search) obj;
        return Objects.equals(code, other.code) &&
                Objects.equals(name, other.name) &&
                Objects.equals(time, other.time) &&
                Objects.equals(day, other.day);
    }
}
