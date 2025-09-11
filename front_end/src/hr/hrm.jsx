import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  ClipboardCheck,
  UserPlus,
  Upload,
  Calendar,
} from "lucide-react";


export default function HRM() {
  const navigate = useNavigate();

  const features = [
    { title: "DSR List", icon: Users, path: "/dsr_list" },
    { title: " Attendance List", icon: ClipboardCheck, path: "/attendanceSheet" },
    { title: "Add Users", icon: UserPlus, path: "/users" },
    { title: "Holiday List", icon: Calendar, path: "/holidayCalender" },
    { title: "Attendance Management", icon: Upload, path: "//daily_Attendance" },
    
    
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Top Navbar */}
      <div className="bg-white shadow-md py-4 px-6 sticky top-0 z-30 flex items-center justify-between ">
        <h1 className="text-2xl font-bold text-gray-800 mx-auto container">HRM Dashboard</h1>
      </div>

      {/* Feature Cards */}
      <div className="p-6   mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 container ">
        {features.map((feat, idx) => (
          <div
            key={idx}
            onClick={() => navigate(feat.path)}
            className="bg-white rounded-2xl p-8 h-40 shadow hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="grid justify-center">
            <feat.icon size={46} className="text-blue-500 " />
            <h2 className="text-lg font-semibold text-gray-700 mt-5 ">{feat.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
