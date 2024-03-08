import java.net.URL;
import java.util.ArrayList;

public class Search {
    private ArrayList<Course> courses;

    public Search(ArrayList<Course> courses) {
        this.courses = courses;
    }

    /**
     * @param searchURL the search url
     * @return courses that match the search url
     */
    public Course[] addFilter(URL searchURL) throws Exception {
        throw new Exception("Not yet implemented");
    }

    /**
     * @param searchURL the search url
     * @return modifies the courses that now match the search url
     */
    public Course[] modifyFilter(URL searchURL) throws Exception {
        throw new Exception("Not yet implemented");
    }

    /**
     * @param searchURL the search url
     * @return removes courses that no longer match the search url
     */
    public Course[] removeFilter(URL searchURL) throws Exception {
        throw new Exception("Not yet implemented");
    }

    /**
     * @param student student to generate a course for
     * @param semester semester to generate a course for
     * @return a generate array of courses
     */
    public Course[] generateCuratedCourses(Student student, String semester) throws Exception {
        throw new Exception("Not yet implemented");
    }

}
