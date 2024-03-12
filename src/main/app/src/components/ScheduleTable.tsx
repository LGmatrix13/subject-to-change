import { Course } from "../utils/types";
import CourseTable from "./CourseTable";

interface ScheduleTableProps {
  semester: "Fall" | "Spring";
  schedule?: Course[];
}

export default function ScheduleTable(props: ScheduleTableProps) {
  if (!props.schedule?.length) {
    return (
      <section className="space-y-5 p-7 bg-slate-100 rounded-lg">
        <h2 className="font-bold uppercase text-2xl">
          {props.semester} Schedule
        </h2>
        <p className="italic">You currently have no scheduld courses</p>
      </section>
    );
  }

  return (
    <section className="space-y-5 p-7 bg-slate-100 rounded-lg">
      <h2 className="font-bold uppercase text-2xl">
        {props.semester} Schedule
      </h2>
      <CourseTable courses={props.schedule} />
    </section>
  );
}
