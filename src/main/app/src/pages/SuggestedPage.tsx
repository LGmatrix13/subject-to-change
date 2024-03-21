import CourseTable from "../components/CourseTable";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import useLocalStorage from "../hooks/useLocalStorage";
import { Course } from "../utils/types";
import SuggestedCoures from "../components/SuggestedCoures";

export default function SuggestedPage() {
  const [user] = useLocalStorage("user", {
    id: "",
  });

  const { data } = useSWR<Course[]>(
    `http://localhost:7070/api/suggested`,
    (url: string) => fetcher(url, user.id)
  );

  if (!data) {
    return <SuggestedCoures />;
  }

  return (
    <SuggestedCoures>
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Results</h3>
        <CourseTable courses={data} />
      </div>
    </SuggestedCoures>
  );
}
