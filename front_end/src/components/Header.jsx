import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter(Boolean)
    .filter(name => !/^[a-f\d]{24}$/i.test(name)); 

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");  // ✅ User name state
  const dropdownRef = useRef();

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUserName(userObj.name || "User"); // agar naam na ho to fallback "User"
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
    localStorage.removeItem("user"); // ✅ user bhi hatao
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full flex items-center justify-between px-6 py-4 rounded-md bg-gradient-to-r from-neutral-900 to-blue-700 text-white shadow-md container mx-auto mb-6">
        
        {/* ✅ Left side me User name */}
        <div className="text-xl font-semibold pl-4">
          Welcome, {userName}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="w-8 h-8 rounded-full overflow-hidden border border-white cursor-pointer"
          >
            <img
              src="/logo1.png"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-neutral-800 text-white rounded-md shadow-lg z-50">
              <ul className="py-2 text-sm">
                <li className="px-4 py-2 hover:bg-neutral-950 flex items-center gap-2 cursor-pointer">
                  <FaLock /> Reset Password
                </li>
                <li
                  onClick={() => navigate("/info")}
                  className="px-4 py-2 hover:bg-neutral-950 flex items-center gap-2 cursor-pointer"
                >
                  <FaUser /> Profile Info
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-neutral-950 flex items-center gap-2 cursor-pointer"
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
