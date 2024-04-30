import useSWR from "swr";
import useLocalStorage from "./useLocalStorage";
import { fetcher } from "../utils/fetcher";
import { FALL } from "../utils/constants";
import type { Student } from "../utils/types";

export default function useStudent() {
  const [user] = useLocalStorage("user", {
    jwt: "",
  });
  const [semester] = useLocalStorage<"fall" | "spring">("semester", FALL);

  const { data, isLoading, error } = useSWR<Student>(
    "http://localhost:7070/api/student",
    (url: string) => fetcher(url, user.jwt)
  );

  return {
    student: {
      ...data,
      courses: data?.courses.filter((course) => course.semester === semester),
    } as Student,
    semester: semester,
    isLoading,
    error,
  };
}
