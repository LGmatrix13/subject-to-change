import { Course } from "../utils/types";

interface ScheduleTableProps {
  semester: "Fall" | "Spring";
  courses?: Course[];
}

export default function ScheduleTable(props: ScheduleTableProps) {
  if (!props.courses?.length) {
    return (
      <section className="space-y-5 p-7 bg-slate-100 rounded-lg">
        <h2 className="font-bold uppercase text-2xl">
          {props.semester} Schedule
        </h2>
        <p className="italic">You currently have no scheduled courses</p>
      </section>
    );
  }

  return (
    <section className="space-y-5 p-7 bg-slate-100 rounded-lg">
      <h2 className="font-bold uppercase text-2xl">
        {props.semester} Schedule
      </h2>
      <table className="table-fixed w-full">
        <thead className="text-left font-bold border-b border-gray-800">
          <tr>
            <th className="py-3">Course Name</th>
            <th className="py-3">Professor</th>
            <th className="py-3">Meeting Time</th>
          </tr>
        </thead>
        <tbody className="table-fixed">
          {props.courses.map((course, index: number) => (
            <tr key={index}>
              <td className="py-3">{course.name}</td>
              <td className="py-3">
                {course.professor.firstName} {course.professor.lastName}
              </td>
              <td className="py-3 truncate">
                {course.weekday} {course.startTime} - {course.endTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
