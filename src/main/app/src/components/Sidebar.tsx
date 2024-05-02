import { Link,  useNavigate } from "react-router-dom";
import logo from "/gcc_logo.png";

interface SidebarProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}


export default function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const { user } = props;

  return (
    <aside className="h-screen hidden lg:flex flex-col bg-slate-100 w-[350px] p-10 justify-between top-0 sticky">
      <div className="flex flex-col space-y-10">
        <Link to="/">
          <img src={logo} alt="Grove City College Logo" />
        </Link>
        <div className="border-t border-gray-800" />
        <div className="flex flex-col space-y-7">
          <Link to="/" className="flex items-center justify-between">
            <p className="uppercase font-bold">Schedule</p>
            {location.pathname === "/" && <span className="ml-2 rounded-full bg-gray-600 w-2 h-2" />}
          </Link>
          <Link to="/search" className="flex items-center justify-between">
            <p className="uppercase font-bold">Search</p>
            {location.pathname === "/search" && <span className="ml-2 rounded-full bg-gray-600 w-2 h-2" />}
          </Link>
          <Link to="/suggested" className="flex items-center justify-between">
            <p className="uppercase font-bold">Suggested</p>
            {location.pathname === "/suggested" && <span className="ml-2 rounded-full bg-gray-600 w-2 h-2" />}
          </Link>
          <Link to="/professors"  className="flex items-center justify-between">
            <p className="uppercase font-bold">Professors</p>
            {location.pathname === "/professors" && <span className="ml-2 rounded-full bg-gray-600 w-2 h-2" />}
          </Link>
          <Link to="/progress"  className="flex items-center justify-between">
            <p className="uppercase font-bold">Progress</p>
            {location.pathname === "/progress" && <span className="ml-2 rounded-full bg-gray-600 w-2 h-2" />}
          </Link>
        </div>
      </div>
      <div className="flex flex-col space-y-5 items-start border-t border-gray-800 pt-5">
        <p className="font-bold">{user.firstName} {user.lastName}</p>
        <button onClick={() => {
            window.localStorage.clear();
            navigate("/auth/login");          
        }} className="uppercase font-bold text-sm">Sign Out</button>
      </div>
    </aside>
  );
}