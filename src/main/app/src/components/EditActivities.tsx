import { useSWRConfig } from "swr";
import useLocalStorage from "../hooks/useLocalStorage";
import { Activity } from "../utils/types";
import { RemoveIcon } from "./Icons";
import dateFormatter from "../utils/dateFormatter";
import { generateColor } from "../utils/generateColor";

interface ActivitiesTableProps {
  semester: "fall" | "spring";
  activties: Activity[];
}

export default function EditActivities(props: ActivitiesTableProps) {
  const { mutate } = useSWRConfig();
  const [user] = useLocalStorage("user", {
    jwt: "",
  });

  async function removeEvent(event: Activity) {
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

  if (!props.activties.length) {
    return (
      <section className="space-y-5">
        <h2 className="font-bold uppercase text-xl">Edit Activities</h2>
        <p>You currently have no activties saved.</p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <h2 className="font-bold uppercase text-xl">Edit Activities</h2>
      {props.activties.map((activity) => (
        <div
          className={`truncate ${generateColor(
            activity.number || 0
          )} text-white p-3 rounded-lg flex items-center`}
        >
          <div>
            <p>{activity.name}</p>
            <p className="text-sm">
              {activity.weekday},{" "}
              {dateFormatter(activity.startTime, activity.endTime)}
            </p>
          </div>
          <button
            className="ml-auto order-2"
            onClick={() => removeEvent(activity)}
          >
            <RemoveIcon />
          </button>
        </div>
      ))}
    </section>
  );
}
