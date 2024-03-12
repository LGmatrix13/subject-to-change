import { Professor } from "../utils/types";

export default function ProfessorCard(props: Professor) {
  return (
    <div className="bg-slate-100 rounded-lg p-7 space-y-5">
      <div className="space-y-3">
        <h2 className="font-bold">
          {props.firstName} {props.lastName}
        </h2>
        <p>{props.department}</p>
      </div>
    </div>
  );
}
