import type { Course } from "../utils/types";
import useLocalStorage from "../hooks/useLocalStorage";
import { mutate } from "swr";
import { AddIcon, SignInIcon } from "./Icons";
import composeEmail from "../utils/composeEmail";
import dateFormatter from "../utils/dateFormatter";

interface CourseTableProps {
  courses: Course[];
}

export default function CourseTable(props: CourseTableProps) {
  const [user] = useLocalStorage("user", {
    jwt: "",
  });

  async function addCourse(course: Course) {
    const response = await fetch("http://localhost:7070/api/courses", {
      method: "POST",
      headers: {
        jwt: user.jwt,
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
    <table className="w-full">
      <thead className="text-left font-bold border-b border-gray-800">
        <tr>
          <th className="w-[40%] pb-3">Course Name</th>
          <th className="w-[20%] pb-3">Professor</th>
          <th className="w-[25%] pb-3">Meeting Time</th>
          <th className="w-[10%] pb-3">Seats</th>
          <th className="w-[5%] pb-3" />
        </tr>
      </thead>
      <tbody>
        {props.courses.map((course, index: number) => (
          <tr key={index}>
            <td className="py-3 truncate">{course.name}</td>
            <td className="py-3 truncate">
              {course.professorFirstName} {course.professorLastName}
            </td>
            <td className="py-3 truncate">
              {course.weekday} {dateFormatter(course.startTime, course.endTime)}
            </td>
            <td className="py-3 ">
              {course.enrolled}/{course.seats}
            </td>
            <td className="py-3">
              {course.enrolled >= course.seats ? (
                <a href={composeEmail(course)}>
                  <button>
                    <SignInIcon />
                  </button>
                </a>
              ) : (
                <button onClick={() => addCourse(course)}>
                  <AddIcon />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
