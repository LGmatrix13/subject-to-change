import useSWR from "swr";
import useLocalStorage from "./useLocalStorage";
import { fetcher } from "../utils/fetcher";
import { Student } from "../utils/types";
import { FALL } from "../utils/constants";

export default function useStudent() {
  const [user] = useLocalStorage("user", {
    id: "",
  });
  const [semester] = useLocalStorage<"FALL" | "SPRING">("semester", FALL);

  const { data, isLoading, error } = useSWR<Student>(
    "http://localhost:7070/api/student",
    (url: string) => fetcher(url, user.id)
  );

  return {
    student: data,
    semester: semester,
    isLoading,
    error,
  };
}
