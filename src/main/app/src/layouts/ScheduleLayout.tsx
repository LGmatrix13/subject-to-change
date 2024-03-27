import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FALL, SPRING } from "../utils/constants";

interface ScheduleLayoutProps {
  children: React.ReactElement;
}

export default function ScheduleLayout(props: ScheduleLayoutProps) {
  const [semester, setSemester] = useLocalStorage<"FALL" | "SPRING">(
    "semester",
    FALL
  );

  function toggleSemester() {
    setSemester(semester === FALL ? SPRING : FALL);
  }

  const activeClassName =
    "bg-blue-600 text-white px-3 py-1 rounded-full font-normal";
  return (
    <section className="space-y-5 mb-10 animate-fade" key={semester}>
      <div className="flex items-center">
        <h1 className="uppercase text-3xl font-light">Schedule</h1>
        <div className="flex space-x-3 ml-auto order-2 font-bold">
          <button
            className={semester === FALL ? activeClassName : ""}
            onClick={toggleSemester}
          >
            Fall
          </button>
          <button
            className={semester === SPRING ? activeClassName : ""}
            onClick={toggleSemester}
          >
            Spring
          </button>
        </div>
      </div>
      {props.children}
    </section>
  );
}
