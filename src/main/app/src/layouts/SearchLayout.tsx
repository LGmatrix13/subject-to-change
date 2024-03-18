import useLocalStorage from "../hooks/useLocalStorage";

interface CoursesLayoutProps {
  children: React.ReactNode;
}

export default function CoursesLayout(props: CoursesLayoutProps) {
  const [semester, setSemester] = useLocalStorage<"Fall" | "Spring">(
    "semester",
    "Fall"
  );

  function toggleSemester() {
    setSemester(semester === "Fall" ? "Spring" : "Fall");
  }

  const activeClassName =
    "bg-blue-600 text-white px-3 py-1 rounded-full font-normal";
  return (
    <section className="space-y-5 mb-10 animate-fade" key={semester}>
      <div className="flex items-center">
        <h1 className="uppercase text-3xl font-light">Search</h1>
        <div className="flex space-x-3 ml-auto order-2 font-bold">
          <button
            className={semester === "Fall" ? activeClassName : ""}
            onClick={toggleSemester}
          >
            Fall
          </button>
          <button
            className={semester === "Spring" ? activeClassName : ""}
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
