import useSWR from "swr";
import { Student } from "../utils/types";
import { fetcher } from "../utils/fetcher";
import useLocalStorage from "../hooks/useLocalStorage";
import ScheduleTable from "../components/ScheduleTable";
import Loading from "../components/Loading";
import WeeklySchedule from "../components/ScheduleCalendar";

interface SchedulePageProps {
  semester: "Fall" | "Spring";
}

export default function SchedulePage(props: SchedulePageProps) {
  const [user] = useLocalStorage("user", {
    id: "",
  });

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

  const schedules = {
    Fall: data?.fallSchedule,
    Spring: data?.springSchedule,
  };

  return (
    <>
      <ScheduleTable semester="Fall" courses={data?.fallSchedule} />
      <ScheduleTable semester="Spring" courses={data?.springSchedule} />
      {/* <WeeklySchedule schedule={data} />  */}
    </>
  );
}
