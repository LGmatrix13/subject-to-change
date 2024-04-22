import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FALL, SPRING } from "../utils/constants";
import containerBackground from "/containerBackground.png";

interface BaseLayoutProps {
  title: string;
  children: React.ReactElement;
}

export default function BaseLayout(props: BaseLayoutProps) {
  const [semester, setSemester] = useLocalStorage<"fall" | "spring">(
    "semester",
    FALL
  );

  function toggleSemester() {
    setSemester(semester === FALL ? SPRING : FALL);
  }

  const activeClassName =
    "bg-blue-600 text-white px-3 py-1 rounded-full font-normal";
  return (
    <section className="space-y-5 mb-10">
      <div className="flex items-center">
        <h1 className="uppercase text-3xl font-light">{props.title}</h1>
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
      <div
        className="bg-slate-200 rounded-lg animate-fade shadow-inner p-7 space-y-5"
        key={semester}
        style={{
          backgroundImage: `url(${containerBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {props.children}
      </div>
    </section>
  );
}
