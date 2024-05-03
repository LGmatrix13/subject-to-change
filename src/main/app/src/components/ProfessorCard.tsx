import { Professor } from "../utils/types";

interface ProfessorCardProps {
  professor: Professor;
}

export default function ProfessorCard(props: ProfessorCardProps) {
  const tempBio = `Dr. ${props.professor.lastName} is a professor of ${props.professor.department} at Grove City College. They are excited to meet you and help you learn more about their subject!`;

  return (
    <div className="bg-white rounded-lg p-5 shadow-lg">
      <div className="flex items-center space-x-4 pb-5 border-b">
        <div>
          <h2 className="text-xl font-bold">
            {props.professor.firstName} {props.professor.lastName}
          </h2>
          <p className="text-gray-500">{props.professor.department}</p>
        </div>
      </div>

      <div className="pt-5 space-y-2 pb-5 border-b">
        <div className="flex justify-between items-center pb-2">
          <p className="font-bold inline">Room Number:</p>
          <p className="inline text-gray-600 text-sm">{"-"}</p>
        </div>
        <div className="flex justify-between items-top pb-2">
          <p className="inline font-bold ">Office Hours:</p>
          <div className="inline text-gray-600 text-sm">
            <p>-</p>
          </div>
        </div>
        <div className="flex justify-between items-top">
          <p className="font-bold inline pr-2">Bio:</p>
          <p className="inline text-gray-600 text-sm">{tempBio}</p>
        </div>
      </div>

      <div className="pt-5 p-2 rounded bg-gray-300">
        <div className="flex flex-col items-center">
          <h3 className="font-bold pb-5">Rate My Professor Score</h3>
        </div>
        <div className="flex justify-between items-top pb-2">
          <p className="font-bold inline pr-2">
            {props.professor.rating || "-"}/5
          </p>
          <p className="inline text-sm">
            from <strong>{props.professor.numRatings || 0}</strong> reviews
          </p>
        </div>
        <div className="flex justify-between items-top">
          <p className="font-bold inline pr-2">Difficulty:</p>
          <p className="inline">{props.professor.difficulty || "-"}</p>
        </div>
      </div>
    </div>
  );
}
