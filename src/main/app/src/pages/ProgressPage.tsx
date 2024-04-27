import CourseTable from "../components/CourseTable";
import Loading from "../components/Loading";
import ProgressSheet from "../components/ProgressSheet";
import { useDelay } from "../hooks/useDelay";
import useProgress from "../hooks/useProgress";

export default function ProgressPage() {
  const delay = useDelay();
  const { suggested, isLoading, error } = useSuggested();
  if (error) return <div>Error loading data</div>;
  if (isLoading || delay) return <Loading height={500} />;
  if (!suggested) return <div>Nn Progress made</div>;

  return (
    <SuggestedCoures>
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Results</h3>
        <CourseTable courses={suggested} />
      </div>
    </SuggestedCoures>
  );
}