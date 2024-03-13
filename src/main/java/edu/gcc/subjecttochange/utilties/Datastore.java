package edu.gcc.subjecttochange.utilties;

import edu.gcc.subjecttochange.models.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class Datastore {
    public static final ArrayList<Student> students = new ArrayList<>();

    public static final ArrayList<Course> courses = new ArrayList<>();
    public static final HashMap<Search, List<Course>> searchHistory = new HashMap<>();

    public static Optional<Student> getStudent(String studentId) {
        return students.stream().filter(item -> item.id.equals(studentId)).findFirst();
    }
}
