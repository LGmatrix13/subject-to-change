import { useSWRConfig } from "swr";
import useLocalStorage from "../hooks/useLocalStorage";
import { Course } from "../utils/types";
import { RemoveIcon } from "./Icons";
import dateFormatter from "../utils/dateFormatter";

interface ScheduleTableProps {
  semester: "fall" | "spring";
  courses: Course[];
}

export default function ScheduleTable(props: ScheduleTableProps) {
  const { mutate } = useSWRConfig();
  const [user] = useLocalStorage("user", {
    jwt: "",
  });

  async function removeCourse(course: Course) {
    const response = await fetch("http://localhost:7070/api/courses", {
      method: "DELETE",
      headers: {
        jwt: user.jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      const message = await response.text();
      alert(message);
      mutate("http://localhost:7070/api/student");
    } else {
      const message = await response.text();
      alert(message);
    }
  }

  return (
    <section className="space-y-5 p-7 bg-slate-100 rounded-lg custom-shadow">
      <h2 className="font-bold uppercase text-2xl">
        {props.semester} Schedule
      </h2>
      <table className="w-full">
        <thead className="text-left font-bold border-b border-gray-800">
          <tr>
            <th className="w-[40%] pb-3">Course Name</th>
            <th className="w-[20%] pb-3">Professor</th>
            <th className="w-[25%] py-3">Meeting Time</th>
            <th className="w-[5%] py-3" />
          </tr>
        </thead>
        <tbody>
          {props.courses.map((course, index: number) => (
            <tr key={index}>
              <td className="py-3">{course.name}</td>
              <td className="py-3">
                {course.professorFirstName} {course.professorLastName}
              </td>
              <td className="py-3 truncate">
                {course.weekday}{" "}
                {dateFormatter(course.startTime, course.endTime)}
              </td>
              <td className="py-3">
                <button onClick={() => removeCourse(course)}>
                  <RemoveIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
