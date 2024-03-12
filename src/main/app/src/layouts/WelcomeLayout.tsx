import useLocalStorage from "../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

interface WelcomeLayoutProps {
  children: React.ReactNode;
}

export default function WelcomeLayout(props: WelcomeLayoutProps) {
  const [user] = useLocalStorage("user", null);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="sm:w-96 w-3/4 flex flex-col space-y-5">
        <h1 className="uppercase text-3xl font-light">Welcome</h1>
        {props.children}
      </div>
    </main>
  );
}
