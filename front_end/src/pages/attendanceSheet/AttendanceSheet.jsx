import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white p-6">
      <h2 className="text-3xl font-bold mb-6  text-gray-200">
        Attendance List
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-700">
        <table className="min-w-full border-gray-300  border rounded-lg">
          <thead className="bg-neutral-800/80 text-gray-300 uppercase text-sm">
            <tr>
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
                  className="border-t border-neutral-700 hover:bg-neutral-800/70 transition"
                >
                  <td className="px-6 py-3 border border-gray-600">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 border border-gray-600">{item.day}</td>
                  <td className="px-6 py-3 border border-gray-600">
                    {item.check_in || "-"}
                  </td>
                  <td className="px-6 py-3 border border-gray-600">
                    {item.check_out || "-"}
                  </td>
                  <td
                    className={`px-6 py-3 border border-gray-600 font-semibold ${
                      item.attendance_status === "Present"
                        ? "text-green-400"
                        : item.attendance_status === "Half Day"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.attendance_status}
                  </td>
                  <td className="px-6 py-3 border border-gray-600 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-500 hover:scale-110 hover:bg-red-600 text-white rounded-lg text-sm"
                    >
                      Delete
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

