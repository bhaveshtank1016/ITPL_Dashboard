import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUserPlus,
  faUser,
  faTableColumns,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { ClipboardList } from "lucide-react";
import { IoCalendarNumber } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  console.log("User from Sidebar:", user);

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
        className={`fixed top-0 left-0 bg-gradient-to-r from-neutral-900 to-blue-900 border border-r-2 rounded-md border-white text-white z-50 transform duration-300 ease-in-out min-h-screen 
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
        <div className="pl-6 pt-4 hidden lg:flex items-center gap-2">
          <img src="/logo1.png" className="w-8" alt="Logo" />
          {expanded && <span className="text-xl font-bold">ITPL</span>}
        </div>

        {/* Menu */}
        <div className="mt-4 flex flex-col pl-6 px-2">
          <SidebarLink
            to="/dashboard"
            icon={<FontAwesomeIcon icon={faTableColumns} />}
            label="Dashboard"
            current={location.pathname}
            expanded={expanded}
          />
          

          {user && user.role && user.role.name?.toLowerCase() === "admin" && (
            <SidebarLink
              to="/users"
              icon={<FontAwesomeIcon icon={faUserPlus} />}
              label="Add User"
              current={location.pathname}
              expanded={expanded}
            />
          )}
          {user && user.role && user.role.name?.toLowerCase() === "admin" && (
            <SidebarLink
              to="/role"
              icon={<FontAwesomeIcon icon={faUser} />}
              label="Role"
              current={location.pathname}
              expanded={expanded}
            />
          )}

          {/* SHow dsr list */}
          <SidebarLink
            to="/dsr_list"
            icon={<IoMdList size={19} />}
            label="DSR List"
            current={location.pathname}
            expanded={expanded}
          />
          <SidebarLink
            to="/add_Dsr_Report"
            icon={<MdOutlinePlaylistAdd size={25} />}
            label="Add DSR Report"
            current={location.pathname}
            expanded={expanded}
          />
          <SidebarLink
            to="/attendanceSheet"
            icon={<FaPersonChalkboard size={22} />}
            label="Attendance Sheet"
            className="shrink-0"
            current={location.pathname}
            expanded={expanded}
          />
          <SidebarLink
            to="/daily_Attendance"
            icon={<ClipboardList size={22} />}
            label="Daily Attendance Report"
            current={location.pathname}
            expanded={expanded}
          />
          <SidebarLink
            to="/holidayCalender"
            icon={<IoCalendarNumber size={19} />}
            label="Holiday Calendar"
            current={location.pathname}
            expanded={expanded}
          />

          {/* Dropdown Menus */}
          <DropdownMenu
            expanded={expanded}
            isOpen={openLeaveMenu}
            toggle={toggleLeaveMenu}
            icon={<FaRegFolder size={19} />}
            title="Leave Apply"
            links={[
              { to: "/leaveList", label: "Leave List" },
              { to: "/addLeave", label: "Add Leave" },
            ]}
          />
          <DropdownMenu
            expanded={expanded}
            isOpen={openResignMenu}
            toggle={toggleMenu}
            icon={<FaRegFolder size={19} />}
            title="E-Resign/Ref"
            links={[
              { to: "/addEmpReference", label: "Add Emp Reference" },
              { to: "/empReferenceListing", label: "Emp Reference Listing" },
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
      current === to ? "text-blue-500 font-bold border" : "hover:border"
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

