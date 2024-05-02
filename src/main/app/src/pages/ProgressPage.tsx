import { Course } from "../utils/types";
import CareerProgress from "../components/CareerProgress";
import { useDelay } from "../hooks/useDelay";
import useProgress from "../hooks/useProgress";
import useStudent from "../hooks/useStudent";
import WideButton from "../components/WideButton";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { ProgressBar } from "../components/ProgressBar";

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

export default function ProgressPage() {
  const delay = useDelay();

  // fetch data
  // process it
  const { courses, isLoading, error } = useProgress();

  if (error) return <div>Error loading data</div>;
  if (isLoading || delay) return <Loading height={500} />;

  if (!courses?.length) {
    return (
      <Alert
        title="You are not enrolled in a course"
        message="There are no courses in your schedule, so you currently have no professors this year."
      >
        <Link to="/search">
          <WideButton>Enroll in a Course</WideButton>
        </Link>
      </Alert>
    );
  }

  return (
    <CareerProgress>
      <div className="space-y-5">
        <h2 className="text-2xl font-bold uppercase">Requirements</h2>
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Humanities Core</h3>
          <p>Completed {checkHumas(courses)}/5</p>
          <ProgressBar total={5} taken={checkHumas(courses)} />
        </div>
        <div className="space-y-3">
          <h4 className="text-xl font-bold">
            Studies in Science, Faith, and Technology
          </h4>
          <p>Completed {checkSSFT(courses)}/1</p>
          <ProgressBar total={1} taken={checkSSFT(courses)} />
        </div>
        <div className="space-y-3">
          <h5 className="text-xl font-bold">Writing Requirement</h5>
          <p>Completed {checkWriting(courses)}/1</p>
          <ProgressBar total={1} taken={checkWriting(courses)} />
        </div>
        <div className="space-y-3">
          <h6 className="text-xl font-bold">
            Foundations of the Social Sciences
          </h6>
          <p>Completed {checkFoudation(courses)}/1</p>
          <ProgressBar total={1} taken={checkFoudation(courses)} />
        </div>
      </div>
    </CareerProgress>
  );
}
