// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   CalendarDays,
//   LogOut,
//   CheckCircle,
//   XCircle,
//   Clock,
// } from "lucide-react";
// import {
//   faUser,
//   faTableColumns,
//   faBars,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { GoPerson } from "react-icons/go";

// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { ClipboardList } from "lucide-react";
// import { IoCalendarNumber, IoSettingsOutline } from "react-icons/io5";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { RxDashboard } from "react-icons/rx";
// import { IoMdList } from "react-icons/io";
// import { FaPersonChalkboard } from "react-icons/fa6";
// import { useAuth } from "../context/AuthContext";
// import { PiUserSwitch } from "react-icons/pi";
// import DarkmodeToggle from "../components/DarkmodeToggle";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [expanded, setExpanded] = useState(true);
//   const [openResignMenu, setOpenResignMenu] = useState(false);
//   const [openLeaveMenu, setOpenLeaveMenu] = useState(false);
//   const [openSettingsMenu, setOpenSettingsMenu] = useState(false);

//   const { user } = useAuth();
//   // console.log("User from Sidebar:", user);

//   const isAdmin = user?.role?.name?.toLowerCase() === "admin";
//   const isHR = user?.role?.name?.toLowerCase() === "hr";
//   const isAdminOrHR = isAdmin || isHR;

//   const toggleLeaveMenu = () => setOpenLeaveMenu((prev) => !prev);
//   const toggleMenu = () => setOpenResignMenu((prev) => !prev);
//   const toggleSettingsMenu = () => setOpenSettingsMenu((prev) => !prev);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully");
//     setTimeout(() => {
//       navigate("/");
//     }, 1000);
//   };
//   return (
//     <>
//       {/* Mobile Toggle */}
//       <div onMouseEnter={() => setExpanded(true)}>
//         <button
//           className="fixed top-7 left-4 z-50 text-white p-2 rounded lg:hidden"
//           onClick={() => setMobileOpen(true)}
//         >
//           <FontAwesomeIcon icon={faBars} />
//         </button>
//       </div>

//       {mobileOpen && (
//         <div
//           onClick={() => setMobileOpen(false)}
//           className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
//         />
//       )}

//       <div
//         className={`fixed top-0 left-0 bg-[#f2f4f5] dark:bg-neutral-900 dark:text-white border border-r-2 rounded-md border-white text-gray-700 z-50 transform duration-300 ease-in-out min-h-screen
//   w-64 lg:static`}
//       >
//         {/* Logo (Desktop) */}

//         <div className="mx-18 my-5  flex items-center gap-2">
//           {/* <img src="/logo1.png" className="w-18" alt="Logo" /> */}
//           <DarkmodeToggle />
//         </div>

//         {/* Menu */}
//         <div className="mt-2 flex flex-col p-3">
//           <SidebarLink
//             to="/dashboard"
//             icon={<RxDashboard size={25} />}
//             label="Dashboard"
//             current={location.pathname}
//             expanded={true}
//           />

//           {isAdminOrHR && (
//             <SidebarLink
//               to="/users"
//               icon={<GoPerson size={30} />}
//               label="Users"
//               current={location.pathname}
//               expanded={true}
//             />
//           )}

//           {isAdminOrHR && (
//             <SidebarLink
//               to="/role"
//               icon={<PiUserSwitch size={30} />}
//               label="Role"
//               current={location.pathname}
//               expanded={true}
//             />
//           )}

//           {/* Show DSR List */}
//           <SidebarLink
//             to="/dsr_list"
//             icon={<IoMdList size={25} />}
//             label="DSR List"
//             current={location.pathname}
//             expanded={true}
//           />

//           <SidebarLink
//             to="/attendanceSheet"
//             icon={<FaPersonChalkboard size={25} />}
//             label="Attendance Sheet"
//             className="shrink-0"
//             current={location.pathname}
//             expanded={true}
//           />
//           <SidebarLink
//             to="/daily_Attendance"
//             icon={<ClipboardList size={25} />}
//             label="Daily Attendance Report"
//             current={location.pathname}
//             expanded={true}
//           />
//           <SidebarLink
//             to="/holidayCalender"
//             icon={<IoCalendarNumber size={25} />}
//             label="Holiday Calendar"
//             current={location.pathname}
//             expanded={true}
//           />

//           {/* Dropdown Menus */}
//           <DropdownMenu
//             expanded={true}
//             isOpen={openLeaveMenu}
//             toggle={toggleLeaveMenu}
//             icon={<CalendarDays size={25} />}
//             title="Leave Apply"
//             links={[
//               { to: "/leaveList", label: "Leave List" },
//               ...(!isAdmin ? [{ to: "/addLeave", label: "Add Leave" }] : []), //admin ko addleave nhi dikhega
//             ]}
//           />
//           <DropdownMenu
//             expanded={true}
//             isOpen={openResignMenu}
//             toggle={toggleMenu}
//             icon={<LogOut size={25} />}
//             title="E-Resign/Ref"
//             links={[
//               ...(isHR
//                 ? [
//                     {
//                       to: "/empReferenceListing",
//                       label: "Emp Reference Listing",
//                     },
//                   ]
//                 : []),
//               { to: "/addResign", label: "Add Resign" },
//               { to: "/resignList", label: "Resign Listing" },
//             ]}
//           />
//           <DropdownMenu
//             expanded={true}
//             isOpen={openSettingsMenu}
//             toggle={toggleSettingsMenu}
//             icon={<IoSettingsOutline size={25} />}
//             title="Settings"
//             links={[
//               { to: "/dashboard", label: "Reset Password" },
//               { to: "/info", label: "Profile Info" },
//               { onClick: handleLogout, label: "Logout" }, // note: can handle onClick for logout
//             ]}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// // Reusable link component
// const SidebarLink = ({ to, icon, label, current, expanded }) => (
//   <Link
//     to={to}
//     className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
//       current === to ? "text-blue-100 font-bold border" : "hover:border"
//     }`}
//   >
//     {icon}
//     {expanded && <span>{label}</span>}
//   </Link>
// );

// // Dropdown Menu Component
// const DropdownMenu = ({ expanded, isOpen, toggle, icon, title, links }) => (
//   <div className="relative">
//     <button
//       onClick={toggle}
//       className="flex items-center gap-3 hover:border p-3 rounded-md w-full"
//     >
//       {icon}
//       {expanded && <span className="flex-1">{title}</span>}
//       {expanded && (isOpen ? <FaChevronUp /> : <FaChevronDown />)}
//     </button>
//     {isOpen && (
//       <div className="ml-8 mt-2 space-y-2 text-md">
//         {links.map((link, i) =>
//           link.onClick ? (
//             <div
//               key={i}
//               onClick={link.onClick}
//               className="block cursor-pointer hover:text-cyan-500"
//             >
//               {link.label}
//             </div>
//           ) : (
//             <Link key={i} to={link.to} className="block hover:text-cyan-500">
//               {link.label}
//             </Link>
//           )
//         )}
//       </div>
//     )}
//   </div>
// );

// export default Sidebar;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalendarDays, LogOut, ClipboardList } from "lucide-react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { GoPerson } from "react-icons/go";

import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoCalendarNumber, IoSettingsOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoMdList } from "react-icons/io";
import { FaPersonChalkboard } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { PiUserSwitch } from "react-icons/pi";
import DarkmodeToggle from "../components/DarkmodeToggle";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [expanded, setExpanded] = useState(true); // sidebar toggle
  const [openResignMenu, setOpenResignMenu] = useState(false);
  const [openLeaveMenu, setOpenLeaveMenu] = useState(false);
  const [openSettingsMenu, setOpenSettingsMenu] = useState(false);

  const { user } = useAuth();

  const isAdmin = user?.role?.name?.toLowerCase() === "admin";
  const isHR = user?.role?.name?.toLowerCase() === "hr";
  const isAdminOrHR = isAdmin || isHR;

  const toggleLeaveMenu = () => setOpenLeaveMenu((prev) => !prev);
  const toggleMenu = () => setOpenResignMenu((prev) => !prev);
  const toggleSettingsMenu = () => setOpenSettingsMenu((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-[#f2f4f5] dark:bg-neutral-900 dark:text-white 
  border-r border-gray-300 min-h-screen transition-all duration-300
  ${expanded ? "w-64" : "w-20"}  
  `}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-5 pt-6 rounded-md "
          >
            {expanded ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>

        {/* Logo / Darkmode */}
        <div className="mx-6 my-5 flex items-center gap-2">
          <DarkmodeToggle />
        </div>

        {/* Menu */}
        <div className="mt-2 flex flex-col p-3">
          <SidebarLink
            to="/dashboard"
            icon={<RxDashboard size={25} />}
            label="Dashboard"
            current={location.pathname}
            expanded={expanded}
          />

          {isAdminOrHR && (
            <SidebarLink
              to="/users"
              icon={<GoPerson size={30} />}
              label="Users"
              current={location.pathname}
              expanded={expanded}
            />
          )}

          {isAdminOrHR && (
            <SidebarLink
              to="/role"
              icon={<PiUserSwitch size={30} />}
              label="Role"
              current={location.pathname}
              expanded={expanded}
            />
          )}

          <SidebarLink
            to="/dsr_list"
            icon={<IoMdList size={25} />}
            label="DSR List"
            current={location.pathname}
            expanded={expanded}
          />

          <SidebarLink
            to="/attendanceSheet"
            icon={<FaPersonChalkboard size={25} />}
            label="Attendance Sheet"
            current={location.pathname}
            expanded={expanded}
          />

          <SidebarLink
            to="/daily_Attendance"
            icon={<ClipboardList size={25} />}
            label="Daily Attendance Report"
            current={location.pathname}
            expanded={expanded}
          />

          <SidebarLink
            to="/holidayCalender"
            icon={<IoCalendarNumber size={25} />}
            label="Holiday Calendar"
            current={location.pathname}
            expanded={expanded}
          />

          {/* Dropdowns */}
          <DropdownMenu
            expanded={expanded}
            isOpen={openLeaveMenu}
            toggle={toggleLeaveMenu}
            icon={<CalendarDays size={25} />}
            title="Leave Apply"
            links={[
              { to: "/leaveList", label: "Leave List" },
              ...(!isAdmin ? [{ to: "/addLeave", label: "Add Leave" }] : []),
            ]}
          />

          <DropdownMenu
            expanded={expanded}
            isOpen={openResignMenu}
            toggle={toggleMenu}
            icon={<LogOut size={25} />}
            title="E-Resign/Ref"
            links={[
              ...(isHR
                ? [
                    {
                      to: "/empReferenceListing",
                      label: "Emp Reference Listing",
                    },
                  ]
                : []),
              { to: "/addResign", label: "Add Resign" },
              { to: "/resignList", label: "Resign Listing" },
            ]}
          />

          <DropdownMenu
            expanded={expanded}
            isOpen={openSettingsMenu}
            toggle={toggleSettingsMenu}
            icon={<IoSettingsOutline size={25} />}
            title="Settings"
            links={[
              { to: "/dashboard", label: "Reset Password" },
              { to: "/info", label: "Profile Info" },
              { onClick: handleLogout, label: "Logout" },
            ]}
          />
        </div>
      </div>
    </>
  );
};

// 🔹 SidebarLink Component
const SidebarLink = ({ to, icon, label, current, expanded }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
      current === to ? "text-blue-500 font-bold border" : "hover:border"
    }`}
  >
    {icon}
    {expanded && <span>{label}</span>} {/* collapse hone par text hide */}
  </Link>
);

// 🔹 Dropdown Menu Component
const DropdownMenu = ({ expanded, isOpen, toggle, icon, title, links }) => (
  <div className="relative">
    <button
      onClick={toggle}
      className="flex items-center gap-3 hover:border p-3 rounded-md w-full"
    >
      {icon}
      {expanded && <span className="flex-1">{title}</span>}
      {expanded && (isOpen ? <FaChevronUp /> : <FaChevronDown />)}
    </button>
    {isOpen && (
      <div className={`ml-${expanded ? "8" : "0"} mt-2 space-y-2 text-md`}>
        {links.map((link, i) =>
          link.onClick ? (
            <div
              key={i}
              onClick={link.onClick}
              className="block cursor-pointer hover:text-cyan-500"
            >
              {link.label}
            </div>
          ) : (
            <Link key={i} to={link.to} className="block hover:text-cyan-500">
              {link.label}
            </Link>
          )
        )}
      </div>
    )}
  </div>
);

export default Sidebar;
