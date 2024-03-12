import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import WideButton from "../components/WideButton";
import { Student } from "../utils/types";

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("http://localhost:7070/api/welcome", {
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
        options={{
          name: "firstName",
          type: "text",
          placeholder: "First Name",
          required: true,
        }}
        onChange={handleChange}
      />
      <Input
        label="Last Name"
        options={{
          name: "lastName",
          type: "text",
          placeholder: "Last Name",
          required: true,
        }}
        onChange={handleChange}
      />
      <Input
        label="Major"
        options={{
          name: "major",
          type: "text",
          placeholder: "Major",
          required: true,
        }}
        onChange={handleChange}
      />
      <Input
        label="Year"
        options={{
          name: "year",
          type: "number",
          placeholder: "Year",
          required: true,
        }}
        onChange={handleChange}
      />
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
