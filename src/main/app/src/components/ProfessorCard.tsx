import { Professor } from "../utils/types";
import shadows from "./shadows"

export default function ProfessorCard(props: Professor) {
    const shadowValues = [
        [-52, 93, 35, 0, [98, 119, 147], 0],
        [-36, 56, 32, 0, [98, 119, 147], 0.01],
        [-10, 6, 20, 0, [98, 119, 147], 0.09],
    ];
    const boxShadow = shadowValues.map(
      ([x, y, blur, spread, color, opacity]) =>
        `${x}px ${y}px ${blur}px ${spread}px rgba(${color.join(',')}, ${opacity})`
    ).join(',');

  return (
    <div className={'bg-white rounded-lg p-7 space-y-5'} style={{boxShadow: boxShadow}}>
      <div className="space-y-3">
        <div>
          <h2 className="font-bold">
            {props.firstName} {props.lastName}
          </h2>
          <p className="text-sm font-normal">
            Room Number: <span className="font-normal">{props.roomNumber}</span>
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg">Office Hours:</h3>
          {props.officeHours.map((hour, index) => (
            <p key={index} className="text-sm font-normal">{hour}</p>
          ))}
        </div>
        <div>
          <h3 className="font-bold text-lg">Bio:</h3>
          <p className="text-sm font-normal">{props.bio}</p>
        </div>
      </div>
    </div>
  );
}
