import useSWR from "swr";
import useLocalStorage from "./useLocalStorage";
import { fetcher } from "../utils/fetcher";
import { FALL } from "../utils/constants";
import type { Course } from "../utils/types";

export default function useStudent() {
  const [user] = useLocalStorage("user", {
    jwt: "",
  });
  const [semester] = useLocalStorage<"fall" | "spring">("semester", FALL);

  const { data, isLoading, error } = useSWR<Course[]>(
    "http://localhost:7070/api/student",
    (url: string) => fetcher(url, user.jwt)
  );

  console.log(semester);

  return {
    student: data?.filter((course) => course.semester === semester),
    semester: semester,
    isLoading,
    error,
  };
}
