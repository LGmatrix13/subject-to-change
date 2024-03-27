import ProfessorCard from "../components/ProfessorCard";
import useProfessors from "../hooks/useProfessors";

export default function ProfessorsPage() {
  const { professors, isLoading, error } = useProfessors();
  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!professors) return <div>No professors</div>;

  return (
    <>
      {professors.map((professor) => (
        <ProfessorCard {...professor} />
      ))}
    </>
  );
}
