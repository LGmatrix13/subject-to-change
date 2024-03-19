import React from "react";
import ProfessorCard from "../components/ProfessorCard";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export default function ProfessorsPage() {
  const { data: professors, error } = useSWR("/professors.json", fetcher);

  if (error) return <div>Error loading data</div>;
  if (!professors) return <div>Loading...</div>;

  const professorCards = professors.map((professor, index) => (
    <ProfessorCard
      key={index}
      firstName={professor.firstName}
      lastName={professor.lastName}
      department={professor.department}
      roomNumber={professor.roomNumber}
      officeHours={professor.officeHours}
      bio={professor.bio}
    />
  ));

  return (
    <div className="grid grid-cols-3 gap-5">
      {professorCards.length > 0 ? (
        professorCards
      ) : (
        <p>No professors available</p>
      )}
    </div>
  );
}