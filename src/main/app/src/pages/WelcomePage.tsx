import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import WideButton from "../components/WideButton";
import { Student } from "../utils/types";
import Select from "../components/Select";
import { Option } from "../components/Option";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [, setUser] = useLocalStorage("user", {
    id: "",
    firstName: "",
    lastName: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("http://localhost:7070/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data: Student = await response.json();
    setUser(data);
    navigate("/");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        label="First Name"
        name="firstName"
        options={{
          type: "text",
          placeholder: "First Name",
          required: true,
        }}
        onChange={handleChange}
      />
      <Input
        label="Last Name"
        name="lastName"
        options={{
          type: "text",
          placeholder: "Last Name",
          required: true,
        }}
        onChange={handleChange}
      />
      <Input
        label="Major"
        name="major"
        options={{
          type: "text",
          placeholder: "Major",
          required: true,
        }}
        onChange={handleChange}
      />
      <Select
        name="year"
        label="Year"
        onChange={handleChange}
        options={{
          required: true,
        }}
      >
        <Option label="Freshman" value="2027" />
        <Option label="Sophomore" value="2028" />
        <Option label="Junior" value="2025" />
        <Option label="Senior" value="2024" />
      </Select>
      <WideButton
        options={{
          type: "submit",
        }}
      >
        Continue
      </WideButton>
    </form>
  );
}
