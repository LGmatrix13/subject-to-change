import { useContext, useState } from "react";
import Input from "./Input";
import WideButton from "./WideButton";
import { ModalContext } from "./Modal";
import Select from "./Select";
import { Option } from "./Option";
import useLocalStorage from "../hooks/useLocalStorage";

export default function AddActivity() {
  const [, setOpen] = useContext(ModalContext);

  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    name: "",
    weekday: "",
  });

  const [user] = useLocalStorage("user", {
    jwt: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("http://localhost:7070/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwt: user.jwt,
      },
      body: JSON.stringify({
        ...formData,
        startTime: "2024-05-03 " + formData.startTime,
        endTime: "2024-05-03 " + formData.endTime,
      }),
    });
    const message = await response.text();
    setOpen(false);
    alert(message);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="space-y-5">
      <h1 className="font-bold uppercase text-xl">Add Activity</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Start Time"
          name="startTime"
          onChange={handleChange}
          options={{
            type: "time",
            placeholder: "Start Time",
            value: formData.startTime,
            step: "2",
          }}
        />
        <Input
          label="End Time"
          name="endTime"
          onChange={handleChange}
          options={{
            type: "time",
            placeholder: "End Time",
            value: formData.endTime,
            step: "2",
          }}
        />
        <Input
          label="Name"
          name="name"
          options={{
            type: "text",
            placeholder: "Name",
            required: true,
          }}
          onChange={handleChange}
        />
        <Select
          label="Weekday"
          name="weekday"
          onChange={handleChange}
          className="p-3 rounded-lg w-full h-[52px] bg-slate-200"
        >
          <Option value="M" label="M" />
          <Option value="T" label="T" />
          <Option value="W" label="W" />
          <Option value="R" label="R" />
          <Option value="F" label="F" />
        </Select>
        <WideButton
          options={{
            type: "submit",
          }}
        >
          Add
        </WideButton>
      </form>
    </div>
  );
}
