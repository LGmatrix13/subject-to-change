import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import useLocalStorage from "./useLocalStorage";
import type { Professor } from "../utils/types";

export default function useProfessors() {
  const [user] = useLocalStorage("user", {
    id: "",
  });

  const { data, isLoading, error } = useSWR<Professor[]>(
    "http://localhost:7070/api/professors",
    (url: string) => fetcher(url, user.id)
  );

  return {
    professors: data,
    isLoading: isLoading,
    error,
  };
}
