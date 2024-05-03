import dateFormatter from "../utils/dateFormatter";
import { Course } from "../utils/types";

interface CourseInformationProps {
  course: Course;
}

export default function CourseInformation(props: CourseInformationProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">{props.course.name}</h1>
      <div className="space-y-3">
        <h2 className="font-bolds">Time</h2>
        <p>{dateFormatter(props.course.startTime, props.course.endTime)}</p>
      </div>
      <div className="space-y-3">
        <h2 className="font-bold">Professor</h2>
        <p>
          {props.course.professorFirstName} {props.course.professorLastName}
        </p>
      </div>
    </div>
  );
}
