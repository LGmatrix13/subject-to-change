import { useSearchParams } from "react-router-dom";
import CourseTable from "../components/CourseTable";
import SearchCourses from "../components/SearchCourses";
import useSearch from "../hooks/useSearch";
import { Search } from "../utils/search";
import Loading from "../components/Loading";

export default function SearchPage() {
  const { search, isLoading, error } = useSearch();
  const [searchParams] = useSearchParams();

  if (error) return <div>Error loading data</div>;
  if (isLoading || !search?.length) {
    return <Loading height={500} />;
  }

  return (
    <SearchCourses key={searchParams.toString()}>
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Results</h3>
        <CourseTable courses={Search.run(search, searchParams)} />
      </div>
    </SearchCourses>
  );
}
