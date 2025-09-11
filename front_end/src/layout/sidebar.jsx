import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalendarDays, LogOut , CheckCircle, XCircle, Clock } from "lucide-react";
import {
  faUser,
  faTableColumns,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FaUsers } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { ClipboardList } from "lucide-react";
import { IoCalendarNumber } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
``;
import { FaRegFolder } from "react-icons/fa";
import { IoMdList } from "react-icons/io";
import { FaPersonChalkboard } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [openResignMenu, setOpenResignMenu] = useState(false);
  const [openLeaveMenu, setOpenLeaveMenu] = useState(false);

  const { user } = useAuth();
  // console.log("User from Sidebar:", user);

  const isAdmin = user?.role?.name?.toLowerCase() === "admin";
  const isHR = user?.role?.name?.toLowerCase() === "hr";
  const isAdminOrHR = isAdmin || isHR;

  const toggleLeaveMenu = () => setOpenLeaveMenu((prev) => !prev);
  const toggleMenu = () => setOpenResignMenu((prev) => !prev);

  return (
    <>
      {/* Mobile Toggle */}
      <div onMouseEnter={() => setExpanded(true)}>
        <button
          className="fixed top-7 left-4 z-50 text-white p-2 rounded lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
        />
      )}

      <div
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          setExpanded(false);
          setOpenLeaveMenu(false);
          setOpenResignMenu(false);
        }}
        className={`fixed top-0 left-0 bg-[#d9e0e8] dark:bg-neutral-900 dark:text-white border border-r-2 rounded-md border-white text-gray-700 z-50 transform duration-300 ease-in-out min-h-screen 
        ${expanded ? "w-64" : "w-20"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static`}
      >
        {/* Header (Mobile) */}
        <div className="pt-4 pl-2 flex items-center justify-between sm:hidden">
          <div className="pl-6 pt-4 flex justify-between items-center gap-2">
            <img src="/logo1.png" className="w-8" alt="Logo" />
            {expanded && <span className="text-xl font-bold">ITPL</span>}
            <button onClick={() => setMobileOpen(false)} className="text-white">
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </div>
        </div>

        {/* Logo (Desktop) */}
        <div className=" p-3 hidden lg:flex items-center gap-2">
          <img src="/logo1.png" className="w-15" alt="Logo" />
          {expanded && <span className="text-xl font-bold">ITPL</span>}
        </div>

        {/* Menu */}
        <div className="mt-2 flex flex-col p-3">

          
         
          <SidebarLink
            to="/dashboard"
            icon={ <MdDashboard size={25} />}
            label="Dashboard"
            current={location.pathname}
            expanded={expanded}
          />
        
        

          {isAdminOrHR && (
            <SidebarLink
              to="/users"
              icon={<FaUsers size={25} />}
              label="Users"
              current={location.pathname}
              expanded={expanded}
            />
          )}

          {isAdminOrHR &&(
            <SidebarLink
              to="/role"
              icon={<IoPerson size={25} />}
              label="Role"
              current={location.pathname}
              expanded={expanded}
            />
          )}

          {/* Show DSR List */}
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
            className="shrink-0"
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

          {/* Dropdown Menus */}
          <DropdownMenu
            expanded={expanded}
            isOpen={openLeaveMenu}
            toggle={toggleLeaveMenu}
            icon={<CalendarDays  size={25} />}
            title="Leave Apply"
            links={[
              { to: "/leaveList", label: "Leave List" },
            ...(!isAdmin ? [{ to: "/addLeave", label: "Add Leave" }] : []), //admin ko addleave nhi dikhega 
            
            ]}
          />
          <DropdownMenu
            expanded={expanded}
            isOpen={openResignMenu}
            toggle={toggleMenu}
            icon={<LogOut  size={25} />}
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
        </div>
      </div>
    </>
  );
};

// Reusable link component
const SidebarLink = ({ to, icon, label, current, expanded }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
      current === to ? "text-blue-900 font-bold border" : "hover:border"
    }`}
  >
    {icon}
    {expanded && <span>{label}</span>}
  </Link>
);

// Dropdown Menu Component
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
      <div className="ml-8 mt-2 space-y-2 text-md">
        {links.map((link, i) => (
          <Link key={i} to={link.to} className="block hover:text-cyan-500">
            {link.label}
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
