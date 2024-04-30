import CourseTable from "../components/CourseTable";
import Loading from "../components/Loading";
import SuggestedCoures from "../components/SuggestedCoures";
import { useDelay } from "../hooks/useDelay";
import useSuggested from "../hooks/useSuggested";

export default function SuggestedPage() {
  const delay = useDelay();
  const { suggested, isLoading, error } = useSuggested();
  if (error) return <div>Error loading data</div>;
  if (isLoading || delay) return <Loading height={500} />;
  if (!suggested?.length) return <div>No suggested courses</div>;

  return (
    <SuggestedCoures>
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Results</h3>
        <CourseTable courses={suggested} />
      </div>
    </SuggestedCoures>
  );
}
