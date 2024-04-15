import { Professor } from "../utils/types";

export default function ProfessorCard(props: Professor) {
  return (
    <div className="bg-slate-100 rounded-lg p-7 space-y-5 custom-shadow">
      <div className="space-y-3">
        <h2 className="font-bold">
          {props.firstName} {props.lastName}
        </h2>
        <p>{props.department}</p>
        <p className="font-bold">
          Room Number: <span className="font-normal">-</span>
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold">Office Hours</h3>
        <p className="font-normal">-</p>
        {/* {props.officeHours.map((hour, index) => (
          <p key={index} className="font-normal">
            {hour}
          </p>
        ))} */}
      </div>
      <div className="space-y-3">
        <h3 className="font-bold">Bio</h3>
        <p className="font-normal">-</p>
      </div>
    </div>
  );
}
