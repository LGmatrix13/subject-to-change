import { Link } from "react-router-dom";
import logo from "/gcc_logo.png";

interface SidebarProps {
  user: {
    firstName: String;
    lastName: String;
    email: String;
  };
}

export default function Sidebar(props: SidebarProps) {
  const { user } = props;
  return (
    <aside className="h-screen hidden lg:flex flex-col bg-slate-100 w-[350px] p-10 justify-between top-0 sticky">
      <div className="flex flex-col space-y-10">
        <Link to="/">
          <img src={logo} alt="Grove City College Logo" />
        </Link>
        <div className="border-t border-gray-800" />
        <div className="flex flex-col space-y-7">
          <Link to="/">
            <p className="uppercase font-bold">Schedule</p>
          </Link>
          <Link to="/search">
            <p className="uppercase font-bold">Search</p>
          </Link>
          <Link to="/professors">
            <p className="uppercase font-bold">Professors</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col space-y-10">
        <div className="border-t border-gray-800" />
        <p className="font-bold">
          {user.firstName} {user.lastName}
        </p>
      </div>
    </aside>
  );
}
