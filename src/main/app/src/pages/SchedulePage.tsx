import useSWR from "swr";
import { Student } from "../utils/types";
import { fetcher } from "../utils/fetcher";
import useLocalStorage from "../hooks/useLocalStorage";
import ScheduleTable from "../components/ScheduleTable";
import Loading from "../components/Loading";

export default function SchedulePage() {
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

  return (
    <>
      <ScheduleTable semester="Fall" schedule={data?.fallSchedule} />
      <ScheduleTable semester="Spring" schedule={data?.springSchedule} />

      {/* <WeeklySchedule schedule={data} />  */}
    </>
  );
}
