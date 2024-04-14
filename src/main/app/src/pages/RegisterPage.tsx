import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import WideButton from "../components/WideButton";
import Select from "../components/Select";
import { Option } from "../components/Option";
import { DEPARTMENTS } from "../utils/constants";
import useLocalStorage from "../hooks/useLocalStorage";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    major: "",
  });
  const [, setUser] = useLocalStorage("user", {
    firstName: "",
    lastName: "",
    jwt: "",
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
    const response = await fetch("http://localhost:7070/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
      navigate("/");
    } else {
      const message = await response.text();
      alert(message);
    }
  }

  return (
    <div className="space-y-5 flex flex-col">
      <h1 className="uppercase text-3xl font-light">Register</h1>
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
          label="Email"
          name="email"
          options={{
            type: "email",
            placeholder: "Email",
            required: true,
          }}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          options={{
            type: "password",
            placeholder: "Password",
            required: true,
          }}
          onChange={handleChange}
        />
        <Select
          name="major"
          label="Major"
          onChange={handleChange}
          options={{
            required: true,
          }}
        >
          {DEPARTMENTS.map((deparment) => (
            <Option label={deparment} value={deparment} />
          ))}
        </Select>

        <WideButton
          options={{
            type: "submit",
          }}
        >
          Continue
        </WideButton>
      </form>
      <Link to="/auth/login">
        <p className="text-center">Or Login</p>
      </Link>
    </div>
  );
}
