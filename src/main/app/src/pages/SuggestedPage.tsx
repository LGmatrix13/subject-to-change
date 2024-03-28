import CourseTable from "../components/CourseTable";
import { TimeIcon } from "../components/Icons";
import Loading from "../components/Loading";
import SuggestedCoures from "../components/SuggestedCoures";
import useSuggested from "../hooks/useSuggested";

export default function SuggestedPage() {
  const { suggested, isLoading, error } = useSuggested();

  if (error) return <div>Error loading data</div>;
  if (isLoading) return <Loading title="Loading Suggested Courses" />;
  if (!suggested) return <div>No suggested courses</div>;

  return (
    <SuggestedCoures>
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Results</h3>
        <CourseTable courses={suggested} />
      </div>
    </SuggestedCoures>
  );
}
