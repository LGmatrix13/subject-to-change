import Sidebar from "../components/Sidebar";
import useLocalStorage from "../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const [user] = useLocalStorage<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>("user", null);

  if (!user) {
    return <Navigate to="/welcome" />;
  }

  return (
    <main className="flex lg:flex-row flex-col">
      <Sidebar user={user} />
      <div className="w-full p-10 overflow-y-visible">{props.children}</div>
    </main>
  );
}
