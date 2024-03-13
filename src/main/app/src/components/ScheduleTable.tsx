import useLocalStorage from "../hooks/useLocalStorage";
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
      alert("Added course to your schedule");
    }
  }

  return (
    <section className="space-y-5 p-7 bg-slate-100 rounded-lg">
      <h2 className="font-bold uppercase text-2xl">
        {props.semester} Schedule
      </h2>
      <table className="text-auto w-full">
        <thead className="text-left font-bold border-b border-gray-800">
          <tr>
            <th className="py-3">Course Name</th>
            <th className="py-3">Professor</th>
            <th className="py-3">Meeting Time</th>
            <th className="py-3">Semester</th>
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
              <td className="py-3">{course.semester}</td>
              <td className="py-3">
              <button
                className="bg-blue-600 py-1 px-3 rounded-full text-white hover:bg-blue-700 transition ease-in-out duration-300"
                onClick={() => removeCourse(course)}
              >
                Remove
              </button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
