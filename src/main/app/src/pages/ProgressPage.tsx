import { Course } from "../utils/types";
import CareerProgress from "../components/CareerProgress";
import { useDelay } from "../hooks/useDelay";
import useProgress from "../hooks/useProgress";
import useStudent from "../hooks/useStudent";


function checkHumas(courses: Course[]): number {
  function filterCondition(course: Course): boolean {
      const numbers = [102,200,202,301,303];
      return course.department === "HUMA" && numbers.includes(course.number);
  }

  return courses.filter(filterCondition).length as number;
}

function checkSSFT(courses: Course[]): number {
  function filterCondition(course: Course): boolean {
    const validCourses = ["SSFT212","COMP205"]
    const courseInfo = `${course.department}${course.number}`
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
      const validCourses = ["ECON120", "HIST120", "POLS101", "HIST141", "HIST204"]
      const courseInfo = `${course.department}${course.number}`
      return validCourses.includes(courseInfo);
  }

  return courses.filter(filterCondition).length as number;
}


export default function ProgressPage() {
  const delay = useDelay();

  // fetch data 
  // process it
  const { student, isLoading, error } = useProgress();

  
  if (isLoading || !student?.length) {
    return <p>loading</p>
  }


  

  return (
    <CareerProgress>
      <div className="space-y-3">
        <div><h2 className="text-2xl font-bold">REQUIREMENTS</h2></div>
        <div><h3 className="text-xl font-bold">Humanities Core</h3>
          <p>Completed {checkHumas(student)}/5</p>
        </div>
        <div><h4 className="text-xl font-bold">Studies in Science, Faith, and Technology</h4>
        <p>Completed {checkSSFT(student)}/1</p>
        </div>
        <div><h5 className="text-xl font-bold">Writing Requirement</h5>
        <p>Completed {checkWriting(student)}/1</p>
        </div>
        <div> <h6 className="text-xl font-bold">Foundations of the Social Sciences</h6>
        <p>Completed {checkFoudation(student)}/5</p>
        </div>

      </div>
    </CareerProgress>
  );
}
