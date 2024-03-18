import useSWR from "swr";
import { Student } from "../utils/types";
import { fetcher } from "../utils/fetcher";
import useLocalStorage from "../hooks/useLocalStorage";
import ScheduleTable from "../components/ScheduleTable";
import Loading from "../components/Loading";
import WeeklySchedule from "../components/ScheduleCalendar";
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"

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

  const handleCreateSchedule = () => {
      <Link to="/search" />
    };

    const schedule = props.semester === "Fall" ? data?.fallSchedule : data?.springSchedule;


  return (
    <>
        {schedule && schedule.length > 0 ? (
          <ScheduleTable semester={props.semester} courses={schedule} />
        ) : (
          <Button variant="contained" onClick={handleCreateSchedule}>
            Create {props.semester} Schedule
          </Button>
        )}
    </>
  );
}
