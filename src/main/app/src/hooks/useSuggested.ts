import useSWR from "swr";
import useLocalStorage from "./useLocalStorage";
import { fetcher } from "../utils/fetcher";
import type { Course } from "../utils/types";
import { FALL } from "../utils/constants";

export default function useStudent() {
  const [user] = useLocalStorage("user", {
    id: "",
  });
  const [semester] = useLocalStorage<"FALL" | "SPRING">("semester", FALL);

  const { data, isLoading, error } = useSWR<Course[]>(
    `http://localhost:7070/api/suggested?semester=${semester}`,
    (url: string) => fetcher(url, user.id)
  );

  return {
    suggested: data,
    semester: semester,
    isLoading,
    error,
  };
}
