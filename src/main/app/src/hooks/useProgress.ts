import useSWR from "swr";
import useLocalStorage from "./useLocalStorage";
import { fetcher } from "../utils/fetcher";
import type { Course } from "../utils/types";

export default function useProgress() {
  const [user] = useLocalStorage("user", {
    jwt: "",
  });
  const { data, isLoading, error } = useSWR<Course[]>(
    "http://localhost:7070/api/student",
    (url: string) => fetcher(url, user.jwt)
  );

  return {
    student: data,
    isLoading,
    error,
  };
}

