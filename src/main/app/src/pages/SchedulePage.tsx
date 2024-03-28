import ScheduleTable from "../components/ScheduleTable";
import WeeklySchedule from "../components/ScheduleCalendar";
import { Link } from "react-router-dom";
import WideButton from "../components/WideButton";
import { FALL } from "../utils/constants";
import useStudent from "../hooks/useStudent";
import Alert from "../components/Alert";

export default function SchedulePage() {
  const { student, semester, isLoading, error } = useStudent();

  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;
  const schedule =
    semester === FALL ? student?.fallSchedule : student?.springSchedule;

  if (!schedule?.length) {
    const semesters = {
      FALL: "fall",
      SPRING: "spring",
    };
    return (
      <Alert
        title={`You are not enrolled in a ${semesters[semester]} semester course`}
        message={`You are not enrolled in a ${semesters[semester]} semester course, so you do not have a ${semesters[semester]} semester schedule.`}
      >
        <Link to="/search">
          <WideButton>
            Enroll in a {semesters[semester]} semester course
          </WideButton>
        </Link>
      </Alert>
    );
  }

  return (
    <>
      <ScheduleTable semester={semester} courses={schedule} />
      <WeeklySchedule courses={schedule} />
    </>
  );
}
