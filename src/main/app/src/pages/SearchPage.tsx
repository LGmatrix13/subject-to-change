import CourseTable from "../components/CourseTable";
import SearchCourses from "../components/SearchCourses";
import useSearch from "../hooks/useSearch";

export default function SearchPage() {
  const { search, error } = useSearch();

  if (error) return <div>Error loading data</div>;
  if (!search?.length) {
    return <SearchCourses />;
  }

  return (
    <SearchCourses>
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Results</h3>
        <CourseTable courses={search} />
      </div>
    </SearchCourses>
  );
}
