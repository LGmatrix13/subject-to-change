import { useState } from "react";
import { Course } from "../utils/types";
import Toggle from "./Toggle";

interface ScheduleCalendarProps {
  courses?: Course[];
}

function sortedCoures(courses: Course[], abbrevDay: string): Course[] {
  const unsortedCoures = courses.filter((course) =>
    course.weekday.includes(abbrevDay)
  );
  return unsortedCoures.sort((a, b) => {
    // Convert startTimes to Date objects for comparison
    const startTimeA = parseTimeString(a.startTime);
    const startTimeB = parseTimeString(b.startTime);

    // Compare startTimes
    return startTimeA.getTime() - startTimeB.getTime();
  });
}

// Function to parse time string with AM/PM to Date object
function parseTimeString(timeString: string): Date {
  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  let hours24 = hours % 12;
  if (period === "PM") {
    hours24 += 12;
  }

  return new Date(1970, 0, 1, hours24, minutes);
}

function DailyView(props: { courses: Course[] }) {
  const daysOfWeek = [
    {
      title: "Monday",
      abbrev: "M",
    },
    {
      title: "Tuesday",
      abbrev: "T",
    },
    {
      title: "Wednesday",
      abbrev: "W",
    },
    {
      title: "Thursday",
      abbrev: "TR",
    },
    {
      title: "Friday",
      abbrev: "F",
    },
    {
      title: "Monday",
      abbrev: "M",
    },
    {
      title: "Monday",
      abbrev: "M",
    },
  ];
  const today = new Date();
  const dayOfWeekIndex = today.getDay();

  return (
    <div className="space-y-5">
      <h3 className="font-bold">{daysOfWeek[dayOfWeekIndex].title}</h3>
      <div className="space-y-3">
        {sortedCoures(props.courses, daysOfWeek[dayOfWeekIndex].abbrev).map(
          (course) => (
            <div className="truncate bg-blue-600 text-white p-3 rounded-lg">
              <p>
                {course.department} {course.number}
              </p>
              <p className="text-sm">
                {course.startTime} - {course.endTime}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function WeekView(props: { courses: Course[] }) {
  const days = [
    {
      title: "Monday",
      abbrev: "M",
    },
    {
      title: "Tuesday",
      abbrev: "T",
    },
    {
      title: "Wednesday",
      abbrev: "W",
    },
    {
      title: "Thursday",
      abbrev: "TR",
    },
    {
      title: "Friday",
      abbrev: "F",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-3">
      {days.map((day) => (
        <div key={day.abbrev} className="space-y-5">
          <h3 className="font-bold">{day.title}</h3>
          <div className="space-y-5">
            {sortedCoures(props.courses, day.abbrev).map((course) => (
              <div className="truncate bg-blue-600 text-white  p-3 rounded-lg">
                <p>
                  {course.department} {course.number}
                </p>
                <p className="text-sm">
                  {course.startTime} - {course.endTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ScheduleCalendar(props: ScheduleCalendarProps) {
  const [view, setView] = useState("Week View");

  function toggleView() {
    setView(view === "Week View" ? "Daily View" : "Week View");
  }

  if (!props.courses) {
    return <p className="italic">There are no coures in your schedule</p>;
  }

  return (
    <section className="space-y-5 p-7 bg-slate-100 rounded-lg">
      <div className="flex items-center">
        <h2 className="font-bold uppercase text-2xl">Weekly Schedule</h2>
        <div className="ml-auto order-2 flex space-x-5">
          <Toggle
            onClick={toggleView}
            checked={view === "Week View"}
            label={view}
          />
        </div>
      </div>
      <div className="animate-fade" key={view}>
        {view === "Week View" ? (
          <WeekView {...props} />
        ) : (
          <DailyView {...props} />
        )}
      </div>
    </section>
  );
}