import useSWR from "swr";
import useLocalStorage from "./useLocalStorage";
import { fetcher } from "../utils/fetcher";
import { useSearchParams } from "react-router-dom";
import { Course } from "../utils/types";

export default function useSearch() {
  const [searchParams] = useSearchParams();
  const [user] = useLocalStorage("user", {
    jwt: "",
  });

  const { data, isLoading, error } = useSWR<Course[]>(
    searchParams.toString().length
      ? `http://localhost:7070/api/search?${searchParams.toString()}`
      : null,
    (url: string) => fetcher(url, user.jwt)
  );

  return {
    search: data,
    isLoading,
    error,
  };
}
