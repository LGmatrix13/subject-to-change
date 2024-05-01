import useSWR from "swr";
import useLocalStorage from "./useLocalStorage";
import { fetcher } from "../utils/fetcher";
import { useSearchParams } from "react-router-dom";
import { Course } from "../utils/types";

export default function useSearch() {
  const [user] = useLocalStorage("user", {
    jwt: "",
  });

  const { data, isLoading, error } = useSWR<Course[]>(
    `http://localhost:7070/api/courses`,
    (url: string) => fetcher(url, user.jwt)
  );

  return {
    search: data,
    isLoading,
    error,
  };
}
