import useSWR from "swr";
import useLocalStorage from "./useLocalStorage";
import { fetcher } from "../utils/fetcher";
import type { Course, Student } from "../utils/types";

export default function useProgress() {
  const [user] = useLocalStorage("user", {
    jwt: "",
  });
  const { data, isLoading, error } = useSWR<Student>(
    "http://localhost:7070/api/student",
    (url: string) => fetcher(url, user.jwt)
  );

  return {
    courses: data?.courses,
    isLoading,
    error,
  };
}
