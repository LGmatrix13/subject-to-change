import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Input from "./Input";
import WideButton from "./WideButton";
import Select from "./Select";
import { Option } from "./Option";
import useLocalStorage from "../hooks/useLocalStorage";
import { departments } from "../utils/constants";

interface SearchCoursesProps {
  children?: React.ReactElement;
}

export default function SearchCourses(props: SearchCoursesProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [semester] = useLocalStorage<"Fall" | "Spring">("semester", "Fall");
  const [search, setSearch] = useState({
    department: searchParams.get("department") || "",
    number: searchParams.get("number") || "",
    name: searchParams.get("name") || "",
    startTime: searchParams.get("startTime") || "",
    endTime: searchParams.get("endTime") || "",
    weekday: searchParams.get("weekday") || "",
    orderBy: searchParams.get("orderBy") || "",
    semester: semester,
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
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
    <section className="p-7 bg-slate-100 rounded-lg space-y-7 mb-10">
      <div className="space-y-5">
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-bold uppercase">
            Add and remove courses
          </h2>
          <p>You can only adjust your schedule during add/drop periods</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-5">
            <Select
              name="department"
              label="Department"
              className="p-3 rounded-lg w-full h-[52px]"
              onChange={handleChange}
            >
              {departments.map((deparment) => (
                <Option
                  label={deparment}
                  value={deparment}
                  selected={search.department === deparment}
                />
              ))}
              <Option
                  label = "None"
                  value = ""
                  selected = {search.deparment === ""}
               />
            </Select>
            <Input
              label="Number"
              name="number"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                type: "number",
                placeholder: "Number",
                min: "0",
                max: "600",
                value: search.number,
              }}
            />
            <Input
              label="Name"
              name="name"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                type: "text",
                placeholder: "Name",
                value: search.name,
              }}
            />
            <Input
              label="Start Time"
              name="startTime"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                type: "text",
                placeholder: "Start Time",
                value: search.startTime,
              }}
            />
            <Input
              label="End Time"
              name="endTime"
              onChange={handleChange}
              className="p-3 rounded-lg w-full"
              options={{
                type: "text",
                placeholder: "End Time",
                value: search.endTime,
              }}
            />
            <Select
              label="Weekday"
              name="weekday"
              onChange={handleChange}
              className="p-3 rounded-lg w-full h-[52px]"
            >
              <Option
                value="MWF"
                label="MWF"
                selected={search.weekday === "MWF"}
              />
              <Option
                value="TR"
                label="TR"
                selected={search.weekday === "TR"}
              />
              <Option
                value=""
                label="None"
                selected={search.weekday === ""}
              />
            </Select>
            <Select
              label="Order By"
              name="orderBy"
              onChange={handleChange}
              className="p-3 rounded-lg w-full h-[52px]"
            >
              <Option
                value="asc"
                label="Most Popular"
                selected={search.weekday === "acs"}
              />
              <Option
                value="desc"
                label="Least Popular"
                selected={search.weekday === "desc"}
              />
              <Option
                value=""
                label="None"
                selected={search.weekday === ""}
              />
            </Select>
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
