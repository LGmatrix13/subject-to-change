import useLocalStorage from "../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  const [user] = useLocalStorage("user", null);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="sm:w-96 w-3/4 flex flex-col space-y-5">
        {props.children}
      </div>
    </main>
  );
}
