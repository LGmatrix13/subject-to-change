import { Course } from "../utils/types";
import { ProgressBar } from "./ProgressBar";

interface CareerProgressProps {
  courses: Course[];
}

function checkHumas(courses: Course[]): number {
  function filterCondition(course: Course): boolean {
    const numbers = [102, 200, 202, 301, 303];
    return course.department === "HUMA" && numbers.includes(course.number);
  }

  return courses.filter(filterCondition).length as number;
}

function checkSSFT(courses: Course[]): number {
  function filterCondition(course: Course): boolean {
    const validCourses = ["SSFT212", "COMP205"];
    const courseInfo = `${course.department}${course.number}`;
    return validCourses.includes(courseInfo);
  }

  return courses.filter(filterCondition).length as number;
}

function checkWriting(courses: Course[]): number {
  function filterCondition(course: Course): boolean {
    const numbers = [101];
    return course.department === "WRIT" && numbers.includes(course.number);
  }

  return courses.filter(filterCondition).length as number;
}

function checkFoudation(courses: Course[]): number {
  function filterCondition(course: Course): boolean {
    const validCourses = [
      "ECON120",
      "HIST120",
      "POLS101",
      "HIST141",
      "HIST204",
      "SOCI101",
    ];
    const courseInfo = `${course.department}${course.number}`;
    return validCourses.includes(courseInfo);
  }

  return courses.filter(filterCondition).length as number;
}
export default function CareerProgress(props: CareerProgressProps) {
  return (
    <section className="p-7 bg-slate-100 rounded-lg space-y-7 custom-shadow">
      <div className="space-y-5">
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-bold uppercase">Career Progress</h2>
          <p>
            How much progress you will make on other degree requirements based
            on the schedule you have made for the year{" "}
          </p>
        </div>
      </div>
      <div className="space-y-5">
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Humanities Core</h3>
          <p>{checkHumas(props.courses)}/5 Completed</p>
          <ProgressBar total={5} taken={checkHumas(props.courses)} />
        </div>
        <div className="space-y-3">
          <h4 className="text-lg font-bold">
            Studies in Science, Faith, and Technology
          </h4>
          <p>{checkSSFT(props.courses)}/1 Completed</p>
          <ProgressBar total={1} taken={checkSSFT(props.courses)} />
        </div>
        <div className="space-y-3">
          <h5 className="text-lg font-bold">Writing Requirement</h5>
          <p>{checkWriting(props.courses)}/1 Completed</p>
          <ProgressBar total={1} taken={checkWriting(props.courses)} />
        </div>
        <div className="space-y-3">
          <h6 className="text-lg font-bold">
            Foundations of the Social Sciences
          </h6>
          <p>{checkFoudation(props.courses)}/1 Completed</p>
          <ProgressBar total={1} taken={checkFoudation(props.courses)} />
        </div>
      </div>
    </section>
  );
}
