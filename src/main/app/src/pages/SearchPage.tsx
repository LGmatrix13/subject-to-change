import CourseTable from "../components/CourseTable";
import SearchCourses from "../components/SearchCourses";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { Course } from "../utils/types";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [user] = useLocalStorage("user", {
    id: "",
  });

  const { data } = useSWR<Course[]>(
    searchParams.toString().length
      ? `http://localhost:7070/api/search?${searchParams.toString()}`
      : null,
    (url: string) => fetcher(url, user.id)
  );

  if (!data) {
    return <SearchCourses />;
  }

  return (
    <SearchCourses>
      <div className="space-y-5">
        <h3 className="text-2xl font-bold">Results</h3>
        <CourseTable courses={data} />
      </div>
    </SearchCourses>
  );
}
