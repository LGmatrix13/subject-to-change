import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Input from "./Input";
import WideButton from "./WideButton";

interface SearchCoursesProps {
  children?: React.ReactElement;
}

export default function SearchCourses(props: SearchCoursesProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    department: searchParams.get("department") || "",
    name: searchParams.get("name") || "",
    startTime: searchParams.get("startTime") || "",
    endTime: searchParams.get("endTime") || "",
    weekday: searchParams.get("weekday") || "",
    semester: searchParams.get("semester") || "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchParams(search);
  }

  return (
    <section className="p-7 bg-slate-100 rounded-lg space-y-10 mb-10">
      <div className="space-y-5">
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-bold uppercase">
            Add and remove courses
          </h2>
          <p>You can only adjust your schedule during add/drop periods</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-5">
            <Input
              label="Department"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                name: "department",
                type: "text",
                placeholder: "Department",
                value: search.department,
              }}
            />
            <Input
              label="Name"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                name: "name",
                type: "text",
                placeholder: "Name",
                value: search.name,
              }}
            />{" "}
            <Input
              label="Start Time"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                name: "startTime",
                type: "text",
                placeholder: "Start Time",
                value: search.startTime,
              }}
            />
            <Input
              label="End Time"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                name: "endTime",
                type: "text",
                placeholder: "End Time",
                value: search.endTime,
              }}
            />
            <Input
              label="Weekday"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                name: "weekday",
                type: "text",
                placeholder: "Weekday",
                value: search.weekday,
              }}
            />
            <Input
              label="Semester"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                name: "semester",
                type: "text",
                placeholder: "Semester",
                value: search.weekday,
              }}
            />
          </div>
          <WideButton
            options={{
              type: "submit",
            }}
          >
            Search
          </WideButton>
        </form>
      </div>
      {props.children}
    </section>
  );
}
