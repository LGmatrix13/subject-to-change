import { useState } from "react";
import { Course } from "../utils/types";
import Toggle from "./Toggle";
import { Modal, ModalButton, ModalContent } from "./Modal";
import AddActivity from "./AddActivity";

interface ScheduleCalendarProps {
  courses: Course[];
}

const daysOfWeek = [
  {
    title: "Monday",
    abbrev: "M",
  },
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
    abbrev: "R",
  },
  {
    title: "Friday",
    abbrev: "F",
  },
  {
    title: "Monday",
    abbrev: "M",
  },
];

function generateColor(courseNumber: number) {
  // Convert hue to a corresponding Tailwind CSS color class
  let colorClass;
  if (courseNumber <= 200) {
    colorClass = "bg-blue-600";
  } else if (courseNumber <= 300) {
    colorClass = "bg-green-600";
  } else if (courseNumber <= 400) {
    colorClass = "bg-yellow-600";
  } else {
    colorClass = "bg-red-600";
  }

  return colorClass;
}

function sortAndFilterCourses(courses: Course[], abbrevDay: string): Course[] {
  const unsortedCoures = courses.filter(
    (course) =>
      course.startTime && course.endTime && course.weekday.includes(abbrevDay)
  );
  return unsortedCoures.sort((a, b) => {
    // Convert startTimes to Date objects for comparison
    const startTimeA = parseTimeString(a.startTime as string);
    const startTimeB = parseTimeString(b.startTime as string);
    return startTimeA.getTime() - startTimeB.getTime();
  });
}

// Function to parse time string with AM/PM to Date object
function parseTimeString(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  return new Date(1970, 0, 1, hours, minutes);
}

function DailyView(props: { courses: Course[] }) {
  const today = new Date();
  const dayOfWeekIndex = today.getDay();

  return (
    <div className="space-y-3">
      <h3 className="font-bold">{daysOfWeek[dayOfWeekIndex].title}</h3>
      {sortAndFilterCourses(
        props.courses,
        daysOfWeek[dayOfWeekIndex].abbrev
      ).map((course) => (
        <div
          className={`truncate ${generateColor(
            course.number
          )} text-white p-3 rounded-lg`}
        >
          <p>
            {course.department} {course.number}
          </p>
          <p className="text-sm">
            {course.startTime} - {course.endTime}
          </p>
        </div>
      ))}
    </div>
  );
}

function WeekView(props: { courses: Course[] }) {
  const days = daysOfWeek.slice(1, daysOfWeek.length - 1);
  function calculateGap(endTimeA: string, startTimeB: string): number {
    const endTime = parseTimeString(endTimeA).getTime();
    const startTime = parseTimeString(startTimeB).getTime();
    const gap = startTime - endTime;
    return gap / (1000 * 60);
  }

  return (
    <div className="grid grid-cols-5 gap-3">
      {days.map((day) => (
        <div key={day.abbrev}>
          <h3 className="font-bold mb-3">{day.title}</h3>
          {sortAndFilterCourses(props.courses, day.abbrev).map(
            (course, index, array) => (
              <div key={index}>
                {index == 0 ? (
                  <div
                    style={{
                      height: Math.ceil(
                        calculateGap("07:00", array[index].startTime as string)
                      ),
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: Math.ceil(
                        calculateGap(
                          array[index - 1].endTime as string,
                          array[index].startTime as string
                        )
                      ),
                    }}
                  />
                )}
                <div
                  className={`flex items-center justify-center truncate text-white rounded-lg ${generateColor(
                    course.number
                  )}`}
                  style={{
                    height: Math.ceil(
                      calculateGap(
                        array[index].startTime as string,
                        array[index].endTime as string
                      )
                    ),
                  }}
                >
                  <p>
                    {course.department} {course.number}
                  </p>
                </div>
                {index == array.length - 1 && (
                  <div
                    style={{
                      height: Math.ceil(
                        calculateGap(array[index].endTime as string, "18:00")
                      ),
                    }}
                  />
                )}
              </div>
            )
          )}
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

  return (
    <section className="space-y-5 p-7 bg-slate-100 custom-shadow rounded-lg">
      <div className="flex items-center">
        <h2 className="font-bold uppercase text-2xl">Weekly Schedule</h2>
        <div className="ml-auto order-2 flex space-x-5">
          <Modal>
            <ModalButton>
              <button>Add Event</button>
            </ModalButton>
            <ModalContent>
              <AddActivity />
            </ModalContent>
          </Modal>
          <Toggle
            onClick={toggleView}
            checked={view === "Week View"}
            label={view}
          />
        </div>
      </div>
      <div key={view}>
        {view === "Week View" ? (
          <WeekView courses={props.courses} />
        ) : (
          <DailyView courses={props.courses} />
        )}
      </div>
    </section>
  );
}
