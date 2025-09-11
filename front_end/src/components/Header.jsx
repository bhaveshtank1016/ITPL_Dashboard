
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkmodeToggle from "./DarkmodeToggle";

const Header = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter(Boolean)
    .filter((name) => !/^[a-f\d]{24}$/i.test(name));

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef();

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUserName(userObj.name || "User");
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Logout
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
      <ToastContainer />
      <div className="max-w-full flex items-center justify-between px-6 py-4 rounded-md 
        bg-[#d9e0e8] text-gray-800 shadow-md  
        dark:bg-neutral-900 dark:text-white dark:border-neutral-700 
        container mx-auto mb-6 transition-colors duration-300">
        
        {/* Left side - User name */}
        <div className="text-xl text-gray-700 dark:text-gray-200 font-semibold pl-4">Welcome, {userName}</div>

        {/* Profile Dropdown */}
        <div className="relative flex gap-3" ref={dropdownRef}>
          <div>
            <DarkmodeToggle />
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 
            dark:border-gray-600 cursor-pointer shadow-sm"
          >
            <img
              src="/logo1.png"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-48 
              bg-white text-gray-700 border shadow-lg rounded-md 
              dark:bg-neutral-800 dark:text-gray-200 dark:border-neutral-700
              z-50 transition-colors duration-300">
              <ul className="py-2 text-sm">
                <li className="px-4 py-2 flex items-center gap-2 cursor-pointer 
                  hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <FaLock /> Reset Password
                </li>
                <li
                  onClick={() => navigate("/info")}
                  className="px-4 py-2 flex items-center gap-2 cursor-pointer 
                  hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  <FaUser /> Profile Info
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 flex items-center gap-2 cursor-pointer 
                  text-red-500 hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  <FaSignOutAlt /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
