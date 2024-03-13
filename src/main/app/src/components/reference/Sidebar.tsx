// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../public/gcc_logo.png";
// import { User } from "@/lib/server/database";
// import profileDefault from "../assets/DefaultProfilePic.fe02ba8a3bdd0ff0d864.png";
// import { usePathname } from "next/navigation";
// import CircleIcon from "@mui/icons-material/Circle";

// interface SidebarProps {
//   user: User;
// }

// function NavigationLink(props: { page: string; href: string }) {
//   const pathname = usePathname();

//   return (
//     <Link href={props.href}>
//       <div className="flex justify-between items-center">
//         <p className="uppercase font-medium">{props.page}</p>
//         {pathname === props.href && <CircleIcon fontSize="small" />}
//       </div>
//     </Link>
//   );
// }

// export default function Sidebar(props: SidebarProps) {
//   const { user } = props;

//   return (
//     <aside className="h-screen hidden lg:flex flex-col bg-main w-[350px] p-10 justify-between top-0 sticky border-r border-slate-400">
//       <div className="space-y-10">
//         <Link href="/schedule">
//           <Image src={logo} alt="Grove City College Logo" />
//         </Link>
//         <div className="border-t border-slate-400" />
//         <div className="flex flex-col space-y-7 text-black">
//           <NavigationLink page="Schedule" href="/schedule" />
//           <NavigationLink page="Professors" href="/professors" />
//           <NavigationLink page="Registrar" href="/registrar" />
//           <NavigationLink page="Progress" href="/progress" />
//           <NavigationLink page="Questions" href="/questions" />
//         </div>
//       </div>
//       <div className="flex flex-col space-y-10">
//         <div className="border-t border-slate-400" />
//         <div className="flex items-center">
//           <p className="text-black">
//             {user.firstName} {user.lastName}
//           </p>
//           <p className="text-black">{user.major}</p>
//           <Image
//             src={profileDefault}
//             alt="profile image"
//             className="rounded-full ml-auto order-2"
//           />
//         </div>
//       </div>
//     </aside>
//   );
// }
