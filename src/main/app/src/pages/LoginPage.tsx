import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import WideButton from "../components/WideButton";
import Select from "../components/Select";
import { Option } from "../components/Option";
import { DEPARTMENTS } from "../utils/constants";
import useLocalStorage from "../hooks/useLocalStorage";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useLocalStorage("user", {
    firstName: "asdf",
    lastName: "asdf",
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
    const response = await fetch("http://localhost:7070/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const jwt = await response.text();
      setUser({ ...user, jwt });
      navigate("/");
    } else {
      const message = await response.text();
      alert(message);
    }
  }

  return (
    <div className="space-y-5 flex flex-col">
      <h1 className="uppercase text-3xl font-light">Login</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
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
        <WideButton
          options={{
            type: "submit",
          }}
        >
          Continue
        </WideButton>
      </form>
      <Link to="/auth/register">
        <p className="text-center">Or Register</p>
      </Link>
    </div>
  );
}
