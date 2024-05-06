import CareerProgress from "../components/CareerProgress";
import { useDelay } from "../hooks/useDelay";
import useProgress from "../hooks/useProgress";
import WideButton from "../components/WideButton";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

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

  return <CareerProgress courses={courses} />;
}
