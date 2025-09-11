import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinFill,RiEdit2Fill } from "react-icons/ri";
const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();

  // Fetch Data
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API_URL}/attendance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAttendance(res.data.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Delete Attendance
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`${API_URL}/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAttendance((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  };

  // Edit Attendance
  const handleEdit = (id) => {
    // Navigate to same form used for Add, but with edit mode
    navigate(`/attendance/edit/${id}`);
  };

  return (
    <div
      className="min-h-screen bg-[#d9e0e8] text-gray-800 rounded-2xl shadow-md  
        dark:bg-neutral-900 dark:text-white p-6"
    >
      <h2 className="text-3xl font-bold mb-6  ">Attendance List</h2>

      <div className="hidden h-screen rounded-2xl md:block overflow-x-auto mt-10">
        <table className="w-full    bg-gray-100/90 dark:bg-neutral-900   ">
          <thead className="bg-neutral-800/80   uppercase  text-gray-300">
            <tr className=" text-sm  font-semibold ">
              <th className="p-3">Date</th>
              <th className="p-3">Day</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? (
              attendance.map((item) => (
                <tr
                  key={item._id}
                  className=" border-t border-gray-700 text-center hover:bg-neutral-800/70 "
                >
                  <td className="p-3">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{item.day}</td>
                  <td className="p-3">{item.check_in || "-"}</td>
                  <td className="p-3">{item.check_out || "-"}</td>
                  <td
                    className={`p-3 font-semibold ${
                      item.attendance_status === "Present"
                        ? "text-green-400"
                        : item.attendance_status === "Half Day"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.attendance_status}
                  </td>
                  <td className="p-3 flex justify-center ">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="px-2 py-1  hover:bg-blue-900  rounded-lg text-xl"
                    >
                   <RiEdit2Fill />

                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-2 py-1 hover:scale-110 hover:bg-red-600  rounded-lg text-xl"
                    >
                      <RiDeleteBinFill  />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-6 text-center text-gray-200 border border-gray-600"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;
