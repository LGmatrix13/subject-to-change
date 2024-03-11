import java.util.ArrayList;

public class Schedule {
    private String semester;
    private ArrayList<Course> courses;

    //this is the schedule class yay
    public Schedule(String semester, ArrayList<Course> courses) {
        this.semester = semester;
        this.courses = courses;
    }

    /**
     * @param course course to add
     */
    public void addCourse(Course course) throws Exception {
        throw new Exception("Not yet implemented");
    }

    /**
     * @param course course to remove
     */
    public void removeCourse(Course course) throws Exception {
        throw new Exception("Not yet implemented");
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public ArrayList<Course> getCourses() {
        return courses;
    }

    public void setCourses(ArrayList<Course> courses) {
        this.courses = courses;
    }
}
