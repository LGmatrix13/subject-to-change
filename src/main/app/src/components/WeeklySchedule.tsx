import { useState } from "react";
import Toggle from "./Toggle";
import { Course } from "../utils/types";

const mwfTimes = [
  "9:00 - 9:50 am",
  "10:00 - 10:50 am",
  "11:00 - 11:50 pm",
  "12:00 - 12:50 am",
  "1:00 - 1:50 pm",
  "2:00 - 2:50 pm",
  "3:00 - 3:50 pm",
];

const trTimes = [
  "8:00 - 9:15 am",
  "9:30 - 10:45 am",
  "11:00 - 12:15 pm",
  "12:30 - 1:45 pm",
  "2:00 - 3:15 pm",
];

interface WeeklyScheduleProps {
  schedule: Course[];
}

export default function WeeklySchedule(props: WeeklyScheduleProps) {
  const [weekDay, setWeekDay] = useState("MWF");

  function toggleWeekDay() {
    setWeekDay(weekDay === "MWF" ? "TR" : "MWF");
  }

  return (
    <section className="space-y-5 p-7 bg-slate-100 rounded-lg">
      <div className="flex items-center">
        <h2 className="font-bold uppercase text-2xl">Weekly Schedule</h2>
        <div className="ml-auto order-2 flex space-x-5">
          <Toggle
            onClick={toggleWeekDay}
            label={weekDay}
            checked={weekDay === "MWF"}
            key={weekDay}
          />
        </div>
      </div>
      <table className="table-fixed w-full animate-fade" key={weekDay}>
        {weekDay === "MWF" ? (
          <thead className="text-left font-bold border-b border-gray-800">
            <tr>
              <th className="py-3" />
              <th className="py-3">Monday</th>
              <th className="py-3">Wednesday</th>
              <th className="py-3">Friday</th>
            </tr>
          </thead>
        ) : (
          <thead className="text-left font-bold border-b border-gray-800">
            <tr>
              <th className="py-3" />
              <th className="py-3">Tuesday</th>
              <th className="py-3">Thursday</th>
            </tr>
          </thead>
        )}
        {weekDay == "MWF" ? (
          <tbody>
            {mwfTimes.map((item, index) => (
              <tr key={index}>
                <td className="py-3">{item}</td>
                {props.schedule.find((course) =>
                  course.startTime.includes(mwfTimes[index])
                ) ? (
                  <>
                    {[0, 1, 2].map((item) => (
                      <td
                        className="py-3  text-white bg-blue-600 text-center"
                        key={item}
                      >
                        {
                          props.schedule.find((course) =>
                            course.startTime.includes(mwfTimes[index])
                          )?.name
                        }
                      </td>
                    ))}
                  </>
                ) : (
                  <>
                    <td />
                    <td />
                    <td />
                  </>
                )}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {trTimes.map((item, index) => (
              <tr key={index}>
                <td className="py-3">{item}</td>
                {props.schedule.find((course) =>
                  course.startTime.includes(trTimes[index])
                ) ? (
                  <>
                    {[0, 1].map((item) => (
                      <td
                        className="py-3 text-white bg-blue-600 text-center"
                        key={item}
                      >
                        {
                          props.schedule.find((course) =>
                            course.startTime.includes(trTimes[index])
                          )?.name
                        }
                      </td>
                    ))}
                  </>
                ) : (
                  <>
                    <td />
                    <td />
                  </>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </section>
  );
}
