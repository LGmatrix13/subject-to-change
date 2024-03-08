import java.util.ArrayList;

public class Student extends Person {
    private String major;
    private String year;
    private ArrayList<Schedule> schedules;

    public Student(
        int id,
        String firstName,
        String lastName,
        String email,
        String major,
        String year
    ) {
        super(id, firstName, lastName, email);
        this.major = major;
        this.year = year;
        this.schedules = new ArrayList<>();
    }

    /**
     * adds a semester schedule for student
     * @param schedule the schedule to add for this student
     */
    public void addSchedule(Schedule schedule) throws Exception{
        throw new Exception("Not yet implemented");
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public ArrayList<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(ArrayList<Schedule> schedules) {
        this.schedules = schedules;
    }
}
