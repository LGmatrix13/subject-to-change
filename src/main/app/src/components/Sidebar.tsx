import { NavLink } from "react-router-dom";
import logo from "/gcc_logo.png";

interface SidebarProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const handleSignOut = () => {
  // Implement your sign-out logic here
};

export default function Sidebar(props: SidebarProps) {
  const { user } = props;

  return (
    <aside className="h-screen hidden lg:flex flex-col bg-slate-100 w-[350px] p-10 justify-between top-0 sticky">
      <div className="flex flex-col space-y-10">
        <NavLink to="/" activeClassName="active" exact>
          <img src={logo} alt="Grove City College Logo" />
        </NavLink>
        <div className="border-t border-gray-800" />
        <div className="flex flex-col space-y-7">
          <NavLink to="/" activeClassName="active" exact className="flex items-center justify-between">
            <p className="uppercase font-bold">Schedule</p>
            {location.pathname === "/" && <span className="ml-2 rounded-full bg-gray-600 w-2 h-2"></span>}
          </NavLink>
          <NavLink to="/search" activeClassName="active" className="flex items-center justify-between">
            <p className="uppercase font-bold">Search</p>
            {location.pathname === "/search" && <span className="ml-2 rounded-full bg-gray-600 w-2 h-2"></span>}
          </NavLink>
          <NavLink to="/suggested" activeClassName="active" className="flex items-center justify-between">
            <p className="uppercase font-bold">Suggested</p>
            {location.pathname === "/suggested" && <span className="ml-2 rounded-full bg-gray-600 w-2 h-2"></span>}
          </NavLink>
          <NavLink to="/professors" activeClassName="active" className="flex items-center justify-between">
            <p className="uppercase font-bold">Professors</p>
            {location.pathname === "/professors" && <span className="ml-2 rounded-full bg-gray-600 w-2 h-2"></span>}
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col space-y-5 items-start border-t border-gray-800 pt-5">
        <p className="font-bold">{user.firstName} {user.lastName}</p>
        <button onClick={handleSignOut} className="uppercase font-bold text-gray-400 text-sm">Sign Out</button>
      </div>
    </aside>
  );
}