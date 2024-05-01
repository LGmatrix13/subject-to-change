import { useSWRConfig } from "swr";
import useLocalStorage from "../hooks/useLocalStorage";
import { Event } from "../utils/types";
import { RemoveIcon } from "./Icons";
import dateFormatter from "../utils/dateFormatter";

interface ActivitiesTableProps {
  semester: "fall" | "spring";
  events: Event[];
}

export default function ScheduleTable(props: ActivitiesTableProps) {
  const { mutate } = useSWRConfig();
  const [user] = useLocalStorage("user", {
    jwt: "",
  });

  async function removeEvent(event: Event) {
    const response = await fetch("http://localhost:7070/api/activity", {
      method: "DELETE",
      headers: {
        jwt: user.jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (response.ok) {
      const message = await response.text();
      alert(message);
      mutate("http://localhost:7070/api/student");
    } else {
      const message = await response.text();
      alert(message);
    }
  }

  function sortEvents<T>(items: T[], predicate: (events: T) => boolean): T[] {
    return items.filter(predicate).sort((a, b) => {
      // Convert startTimes to Date objects for comparison
      const startTimeA = new Date((a as Event).startTime as string);
      const startTimeB = new Date((b as Event).startTime as string);
      // Compare startTimes
      return startTimeA.getTime() - startTimeB.getTime();
    });
  }

  const items = sortEvents<Event>([...props.events], (events:Event) => true);

  

  return (
    <section className="space-y-5 bg-slate-100 rounded-lg custom-shadow">
      <h2 className="font-bold uppercase text-2xl">
        {props.semester} Schedule
      </h2>
      <table className="w-full">
        <thead className="text-left font-bold border-b border-gray-800">
          <tr>
            <th className="w-[30%] pb-3">Activity</th>
            <th className="w-[30%] pb-3">Weekday</th>
            <th className="w-[30%] py-3">Meeting Time</th>
            <th className="w-[10%] py-3" />
          </tr>
        </thead>
        <tbody>
          {items.map((event, index: number) => (
            <tr key={index}>
              <td className="py-3">{event.name}</td>
              <td className="py-3 truncate">
                {event.weekday}
              </td>
              <td>{dateFormatter(event.startTime, event.endTime)}</td>
              <td className="py-3">
                <button onClick={() => removeEvent(event)}>
                  <RemoveIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
