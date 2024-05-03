import { useSearchParams } from "react-router-dom";
import CourseTable from "../components/CourseTable";
import SearchCourses from "../components/SearchCourses";
import useSearch from "../hooks/useSearch";
import { Search } from "../utils/search";

export default function SearchPage() {
  const { search, isLoading, error } = useSearch();
  const [searchParams] = useSearchParams();

  if (error) return <div>Error loading data</div>;

  if (isLoading || !search?.length) {
    return <SearchCourses />;
  }

  return (
    <SearchCourses>
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Results</h3>
        <CourseTable courses={Search.run(search, searchParams)} />
      </div>
    </SearchCourses>
  );
}
