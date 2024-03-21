import { Course } from "../utils/types";
import useLocalStorage from "../hooks/useLocalStorage";
import { mutate } from "swr";
import { boxShadow } from "../utils/constants";
import { AddIcon } from "./Icons";

interface CourseTableProps {
  courses: Course[];
}

export default function CourseTable(props: CourseTableProps) {
  const [user] = useLocalStorage("user", {
    id: "",
  });

  async function addCourse(course: Course) {
    const response = await fetch("http://localhost:7070/api/courses", {
      method: "POST",
      headers: {
        studentId: user.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    const responseText = await response.text();
    alert(responseText);

    if (response.ok) {
      mutate("http://localhost:7070/api/student");
      mutate("http://localhost:7070/api/search/suggested");
    }
  }

  return (
    <div
      className="bg-white p-5 rounded-lg"
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
    >
      <table className="w-full">
        <thead className="text-left font-bold border-b border-gray-800">
          <tr>
            <th className="w-[35%] pb-3">Course Name</th>
            <th className="w-[20%] pb-3">Professor</th>
            <th className="w-[25%] pb-3">Meeting Time</th>
            <th className="w-[10%] pb-3">Seats</th>
            <th className="w-[10%] pb-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.courses.map((course, index: number) => (
            <tr key={index}>
              <td className="py-3 text-wrap">{course.name}</td>
              <td className="py-3 text-wrap">
                {course.professor.firstName} {course.professor.lastName}
              </td>
              <td className="py-3 truncate">
                {course.weekday} {course.startTime} - {course.endTime}
              </td>
              <td className="py-3 ">
                {course.enrolled}/{course.seats}
              </td>
              <td className="py-3">
                <button
                  className="bg-blue-600 py-1 px-3 space-x-1 items-center flex rounded-full text-white hover:bg-blue-700 transition ease-in-out duration-300"
                  onClick={() => addCourse(course)}
                >
                  <AddIcon />
                  <p className="text-md">Add</p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
