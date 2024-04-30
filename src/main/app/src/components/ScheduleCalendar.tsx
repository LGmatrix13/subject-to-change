import { useState } from "react";
import { Course } from "../utils/types";
import { Event } from "../utils/types";
import AddActivity from "./AddActivity";
import { Modal, ModalButton, ModalContent } from "./Modal";
import dateFormatter from "../utils/dateFormatter";
import { AddIcon, ArrowsAcrossIcon, ArrowsVerticalIcon } from "./Icons";


interface ScheduleCalendarProps {
  courses: Course[];
  events: Event[];
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

function sortedCoures(courses: Course[], abbrevDay: string): Course[] {
  return courses
    .filter((course) => course.weekday.includes(abbrevDay))
    .sort((a, b) => {
      // Convert startTimes to Date objects for comparison
      const startTimeA = new Date(a.startTime as string);
      const startTimeB = new Date(b.startTime as string);
      // Compare startTimes
      return startTimeA.getTime() - startTimeB.getTime();
    });
}

function DailyView(props: { courses: Course[], events: Event[] }) {
  const today = new Date();
  const dayOfWeekIndex = today.getDay();

  return (
    <div className="space-y-3">
      <h3 className="font-bold">{daysOfWeek[dayOfWeekIndex].title}</h3>
      {sortedCoures(
        props.courses.filter((course) => course.startTime),
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
            {course.weekday} {dateFormatter(course.startTime, course.endTime)}
          </p>
        </div>
      ))}
      {props.events.map((event) => (
          <div
              className={`truncate ${"bg-red-600"} 
              text-white p-3 rounded-lg`}
        >
          <p>
            {event.name}
          </p>
          <p className="text-sm">
            {event.weekday} {dateFormatter(event.startTime, event.endTime)}
          </p>


          </div>


      ))}
    </div>
  );
}

function WeekView(props: { courses: Course[] }) {
  const days = daysOfWeek.slice(1, daysOfWeek.length - 1);
  function calculateGap(endTimeA: Date, startTimeB: Date): number {
    const gap = Math.abs(startTimeB.getTime() - endTimeA.getTime());
    return gap / (1000 * 60);
  }
  const startBoundary = new Date("2024-04-29 08:00");
  const endBoundary = new Date("2024-04-29 17:00");

  return (
    <div className="grid grid-cols-5 gap-3">
      {days.map((day) => (
        <div key={day.abbrev}>
          <h3 className="font-bold mb-3">{day.title}</h3>
          {sortedCoures(
            props.courses.filter((course) => course.startTime),
            day.abbrev
          ).map((course, index, array) => (
            <div key={index}>
              {index == 0 ? (
                <div
                  style={{
                    height: Math.ceil(
                      calculateGap(
                        startBoundary,
                        new Date(array[index].startTime as string)
                      )
                    ),
                  }}
                />
              ) : (
                <div
                  style={{
                    height: Math.ceil(
                      calculateGap(
                        new Date(array[index - 1].endTime as string),
                        new Date(array[index].startTime as string)
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
                      new Date(array[index].startTime as string),
                      new Date(array[index].endTime as string)
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
                      calculateGap(
                        new Date(array[index].endTime as string),
                        endBoundary
                      )
                    ),
                  }}
                />
              )}
            </div>
          ))}
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
              <button>
                <div className="space-x-3 flex items-center">
                  <AddIcon />
                  <p className="font-bold">Add Activity</p>
                </div>
              </button>
            </ModalButton>
            <ModalContent>
              <AddActivity />
            </ModalContent>
          </Modal>
          <button onClick={toggleView}>
            {view === "Week View" ? (
              <div className="space-x-3 flex items-center">
                <ArrowsVerticalIcon />
                <p className="font-bold">View Daily</p>
              </div>
            ) : (
              <div className="space-x-3 flex items-center">
                <ArrowsAcrossIcon />
                <p className="font-bold">View Weekly</p>
              </div>
            )}
          </button>
        </div>
      </div>
      <div key={view}>
        {view === "Week View" ? (
          <WeekView courses={props.courses} />
        ) : (
          <DailyView courses={props.courses} events={props.events} />
        )}
      </div>
    </section>
  );
}
