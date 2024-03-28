import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ProfessorCard from "../components/ProfessorCard";
import WideButton from "../components/WideButton";
import useProfessors from "../hooks/useProfessors";
import Loading from "../components/Loading";

export default function ProfessorsPage() {
  const { professors, isLoading, error } = useProfessors();
  if (error) return <div>Error loading data</div>;
  if (isLoading) return <Loading title="Loading Professors" />;

  if (!professors?.length) {
    return (
      <Alert
        title="You are not enrolled in a course"
        message="There are no courses in your schedule, so you currently have no professors this year."
      >
        <Link to="/search">
          <WideButton>Enroll in a Course</WideButton>
        </Link>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-7">
      {professors.map((professor) => (
        <ProfessorCard {...professor} />
      ))}
    </div>
  );
}
