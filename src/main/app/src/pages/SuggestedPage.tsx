import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import CourseTable from "../components/CourseTable";
import Loading from "../components/Loading";
import SuggestedCoures from "../components/SuggestedCoures";
import { useDelay } from "../hooks/useDelay";
import useSuggested from "../hooks/useSuggested";
import WideButton from "../components/WideButton";

export default function SuggestedPage() {
  const delay = useDelay();
  const { suggested, isLoading, error } = useSuggested();
  if (error) return <div>Error loading data</div>;
  if (isLoading || delay) return <Loading height={500} />;
  if (!suggested?.length) {
    return (
      <Alert
        title="You are not enrolled in a course"
        message="First enroll in a course to load suggested courses."
      >
        <Link to="/search">
          <WideButton>Enroll in a Course</WideButton>
        </Link>
      </Alert>
    );
  }

  return (
    <SuggestedCoures>
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Results</h3>
        <CourseTable courses={suggested} />
      </div>
    </SuggestedCoures>
  );
}
