import { Course } from "../utils/types";
import useLocalStorage from "../hooks/useLocalStorage";
import { mutate } from "swr";

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
    <table className="table-auto w-full">
      <thead className="text-left font-bold border-b border-gray-800">
        <tr>
          <th className="py-3">Course Name</th>
          <th className="py-3">Professor</th>
          <th className="py-3">Meeting Time</th>
          <th className="py-3">Semester</th>
          <th className="py-3">Seats</th>
          <th className="py-3">Action</th>
        </tr>
      </thead>
      <tbody className="">
        {props.courses.map((course, index: number) => (
          <tr key={index}>
            <td className="py-3">{course.name}</td>
            <td className="py-3">
              {course.professor.firstName} {course.professor.lastName}
            </td>
            <td className="py-3 truncate">
              {course.weekday} {course.startTime} - {course.endTime}
            </td>
            <td className="py-3">{course.semester}</td>
            <td className="py-3 ">
              {course.enrolled}/{course.seats}
            </td>
            <td className="py-3">
              <button
                className="bg-blue-600 py-1 px-3 rounded-full text-white hover:bg-blue-700 transition ease-in-out duration-300"
                onClick={() => addCourse(course)}
              >
                Add
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
