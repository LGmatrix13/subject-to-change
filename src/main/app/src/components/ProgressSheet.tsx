import React from "react";

interface CareerProgressProps {
  children?: React.ReactElement;
}

export default function CareerProgress(props: CareerProgressProps) {
  return (
    <section className="p-7 bg-slate-100 rounded-lg space-y-7 custom-shadow">
      <div className="space-y-5">
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-bold uppercase">Career Progress</h2>
          <p>How much progress you will make on major requirements based on the schedule you have made for the year </p>
          
        </div>
      </div>
      {props.children}
    </section>
  );
}