import { Professor } from "../utils/types";

interface ProfessorCardProps {
  professor: Professor;
}

export default function ProfessorCard(props: ProfessorCardProps) {
  const tempBio = `Dr. ${props.professor.lastName} is a professor of ${props.professor.department} at Grove City College. They are excited to meet you and help you learn more about their subject!`;

  return (
    <div className="bg-white rounded-lg p-5 space-y-5 shadow-lg">
      <div className="flex items-center space-y-3">
        <div>
          <h2 className="text-xl font-bold">
            {props.professor.firstName} {props.professor.lastName}
          </h2>
          <p className="text-gray-500">{props.professor.department}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex">
          <p className="font-bold">Room Number:</p>
          <p className="text-sm order-2 ml-auto">{"-"}</p>
        </div>
        <div className="flex">
          <p className="font-bold">Office Hours:</p>
          <div className="text-sm">
            <p>-</p>
          </div>
        </div>
        <div className="flex justify-between items-top">
          <p className="font-bold inline pr-2">Bio:</p>
          <p className="inline text-gray-600 text-sm">{tempBio}</p>
        </div>
      </div>

      <div className="p-5 rounded bg-slate-200">
        <div className="flex flex-col items-center">
          <h3 className="font-bold">Rate My Professor</h3>
        </div>
        <div className="flex items-center space-y-3">
          <div className="flex space-x-3 font-bold">
            <p className="font-bold">Rating:</p>
            <p>{props.professor.rating || "-"} / 5</p>
          </div>
          <p className="text-sm order-2 ml-auto">
            from{" "}
            <span className="font-bold">{props.professor.numRatings || 0}</span>{" "}
            reviews
          </p>
        </div>
        <div className="flex space-x-3 font-bold">
          <p className="font-bold">Difficulty:</p>
          <p>{props.professor.difficulty || "-"}</p>
        </div>
      </div>
    </div>
  );
}
