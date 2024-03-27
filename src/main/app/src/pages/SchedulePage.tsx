import useSWR from "swr";
import { Student } from "../utils/types";
import { fetcher } from "../utils/fetcher";
import useLocalStorage from "../hooks/useLocalStorage";
import ScheduleTable from "../components/ScheduleTable";
import Loading from "../components/Loading";
import WeeklySchedule from "../components/ScheduleCalendar";
import { Link } from "react-router-dom";
import WideButton from "../components/WideButton";
import { FALL } from "../utils/constants";
import useStudent from "../hooks/useStudent";

export default function SchedulePage() {
  const { student, semester, isLoading, error } = useStudent();

  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!student)
    return (
      <section className="flex flex-col space-y-5 p-7 bg-slate-100 rounded-lg custom-shadow">
        <h2 className="font-bold uppercase text-2xl">{semester} Schedule</h2>
        <p>You currently have no scheduled courses</p>
        <Link to="/search">
          <WideButton>Create {semester} Schedule</WideButton>
        </Link>
      </section>
    );

  const schedule =
    semester === FALL ? student.fallSchedule : student.springSchedule;

  return (
    <>
      <ScheduleTable semester={semester} courses={schedule} />
      <WeeklySchedule courses={schedule} />
    </>
  );
}
