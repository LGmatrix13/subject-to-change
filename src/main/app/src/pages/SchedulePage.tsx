import ScheduleTable from "../components/ScheduleTable";
import WeeklySchedule from "../components/ScheduleCalendar";
import { Link } from "react-router-dom";
import WideButton from "../components/WideButton";
import useStudent from "../hooks/useStudent";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import { useDelay } from "../hooks/useDelay";
import { standardTimeConverter } from "../utils/standardTimeConverter";

export default function SchedulePage() {
  const delay = useDelay();
  const { student, semester, isLoading, error } = useStudent();
  if (error) return <div>Error loading data</div>;
  if (isLoading || delay) {
    return (
      <>
        <Loading height={200} />
        <Loading height={500} />
      </>
    );
  }

  if (!student?.length) {
    return (
      <Alert
        title={`You are not enrolled in a ${semester} semester course`}
        message={`You are not enrolled in a ${semester} semester course, so you do not have a ${semester} semester schedule.`}
      >
        <Link to="/search">
          <WideButton>Enroll in a {semester} semester course</WideButton>
        </Link>
      </Alert>
    );
  }

  return (
    <>
      <ScheduleTable semester={semester} courses={student} />
      <WeeklySchedule courses={student} />
    </>
  );
}
