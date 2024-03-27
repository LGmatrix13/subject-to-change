import ProfessorCard from "../components/ProfessorCard";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Professor } from "../utils/types";
import useLocalStorage from "../hooks/useLocalStorage";

export default function ProfessorsPage() {
  const [user] = useLocalStorage("user", {
    id: "",
  });

  const { data, isLoading, error } = useSWR<Professor[]>(
    "http://localhost:7070/api/professors",
    (url: string) => fetcher(url, user.id)
  );

  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No professors</div>;

  return (
    <>
      {data.map((professor) => (
        <ProfessorCard {...professor} />
      ))}
    </>
  );
}
