import { useSWRConfig } from "swr";
import useLocalStorage from "../hooks/useLocalStorage";
import { Course } from "../utils/types";
import { RemoveIcon } from "./Icons";

interface ScheduleTableProps {
  semester: "Fall" | "Spring";
  courses: Course[];
}

export default function ScheduleTable(props: ScheduleTableProps) {
  const { mutate } = useSWRConfig();
  const [user] = useLocalStorage("user", {
    id: "",
  });

  async function removeCourse(course: Course) {
    const response = await fetch("http://localhost:7070/api/courses", {
      method: "DELETE",
      headers: {
        studentId: user.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      const text = await response.text();
      alert(text);
      mutate("http://localhost:7070/api/student");
    }
  }

  return (
    <section className="space-y-5 p-7 bg-slate-100 rounded-lg">
      <h2 className="font-bold uppercase text-2xl">
        {props.semester} Schedule
      </h2>
      <div className="bg-white p-5 rounded-lg custom-shadow">
        <table className="w-full">
          <thead className="text-left font-bold border-b border-gray-800">
            <tr>
              <th className="w-[35%] pb-3">Course Name</th>
              <th className="w-[20%] pb-3">Professor</th>
              <th className="w-[25%] py-3">Meeting Time</th>
              <th className="w-[10%] py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {props.courses.map((course, index: number) => (
              <tr key={index}>
                <td className="py-3">{course.name}</td>
                <td className="py-3">
                  {course.professor.firstName} {course.professor.lastName}
                </td>
                <td className="py-3 truncate">
                  {course.weekday} {course.startTime} - {course.endTime}
                </td>
                <td className="py-3">
                  <button
                    className="bg-red-600 py-1 px-3 space-x-1 items-center flex rounded-full text-white hover:bg-red-700 transition ease-in-out duration-300"
                    onClick={() => removeCourse(course)}
                  >
                    <RemoveIcon />
                    <p className="text-md">Remove</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
