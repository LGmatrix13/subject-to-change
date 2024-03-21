import useSWR from "swr";
import { Student } from "../utils/types";
import { fetcher } from "../utils/fetcher";
import useLocalStorage from "../hooks/useLocalStorage";
import ScheduleTable from "../components/ScheduleTable";
import Loading from "../components/Loading";
import WeeklySchedule from "../components/ScheduleCalendar";
import { Link } from "react-router-dom";
import WideButton from "../components/WideButton";

export default function SchedulePage() {
  const [user] = useLocalStorage("user", {
    id: "",
  });
  const [semester] = useLocalStorage<"Fall" | "Spring">("semester", "Fall");

  const { data, isLoading } = useSWR<Student>(
    "http://localhost:7070/api/student",
    (url: string) => fetcher(url, user.id)
  );

  if (isLoading) {
    <>
      <Loading height={350} />
      <Loading height={350} />
    </>;
  }

  const schedule =
    semester === "Fall" ? data?.fallSchedule : data?.springSchedule;

  if (!schedule?.length) {
    return (
      <section className="flex flex-col space-y-5 p-7 bg-slate-100 rounded-lg">
        <h2 className="font-bold uppercase text-2xl">{semester} Schedule</h2>
        <p className="italic">You currently have no scheduled courses</p>
        <Link to="/search">
          <WideButton>Create {semester} Schedule</WideButton>
        </Link>
      </section>
    );
  }

  return (
    <>
      <ScheduleTable semester={semester} courses={schedule} />
      <WeeklySchedule courses={schedule} />
    </>
  );
}
