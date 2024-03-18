import React from "react";

interface SearchCoursesProps {
  children?: React.ReactElement;
}

export default function SuggestedCoures(props: SearchCoursesProps) {
  return (
    <section className="p-7 bg-slate-100 rounded-lg space-y-10 mb-10">
      <div className="space-y-5">
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-bold uppercase">Suggested Coures</h2>
          <p>Suggested courses based on your major and what you have taken</p>
        </div>
      </div>
      {props.children}
    </section>
  );
}
