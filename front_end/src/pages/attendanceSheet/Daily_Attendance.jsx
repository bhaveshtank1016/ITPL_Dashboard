import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";

export default function Daily_Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API_URL}attendance?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let records = res.data.data || [];

      // Ensure today is always in table
      const todayDate = new Date().toDateString();
      const todayExists = records.some(
        (r) => new Date(r.date).toDateString() === todayDate
      );

      if (!todayExists) {
        records = [
          {
            date: new Date(),
            day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
            check_in: null,
            check_out: null,
            attendance_status: "Absent", // placeholder until user checks in
          },
          ...records,
        ];
      }

      setAttendance(records);
    } catch (err) {
      console.error("Error fetching attendance", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      const res = await axios.post(
        `${API_URL}attendance/checkin`,
        { userId }, // backend can ignore body and use token; safe to send
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message || "Checked in!");
      await fetchAttendance(); // pull fresh record (with check_in time)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to check in");
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await axios.post(
        `${API_URL}attendance/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message || "Checked out successfully!");
      await fetchAttendance(); // pulls backend-calculated status
    } catch (err) {
      toast.error(err.response?.data?.message || "Check-out failed");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  // Helper: render status — show "None" if checked-in but not checked-out yet
  const renderStatus = (row) => {
    if (row?.check_in && !row?.check_out) return "⏳ None";
    switch (row?.attendance_status) {
      case "Present":
        return "✅ Present";
      case "Half Day":
        return "🕒 Half Day";
      case "Absent":
        return "❌ Absent";
      default:
        return "-";
    }
  };

  return (
    <div className="min-h-screen text-white rounded-md p-5 bg-black">
      <h2 className="text-2xl font-bold mb-4">Employee Attendance Records</h2>

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 text-md">
          <thead className="bg-neutral-950">
            <tr>
              <th className="border px-6 py-4">Date</th>
              <th className="border px-6 py-4">Day</th>
              <th className="border px-6 py-4">Check-in</th>
              <th className="border px-6 py-4">Check-out</th>
              <th className="border px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((row, idx) => {
              const isToday =
                new Date(row.date).toDateString() ===
                new Date().toDateString();

              return (
                <tr key={idx} className="hover:bg-gray-500 text-center">
                  <td className="border px-4 py-2">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{row.day}</td>

                  {/* Check-in cell */}
                  <td className="border px-4 py-2">
                    {isToday && !row.check_in ? (
                      <button
                        onClick={handleCheckIn}
                        className="bg-green-600 px-3 py-1 rounded"
                      >
                        Check In
                      </button>
                    ) : (
                      row.check_in || "-"
                    )}
                  </td>

                  {/* Check-out cell */}
                  <td className="border px-4 py-2">
                    {isToday && row.check_in && !row.check_out ? (
                      <button
                        onClick={handleCheckOut}
                        className="bg-red-600 px-3 py-1 rounded"
                      >
                        Check Out
                      </button>
                    ) : (
                      row.check_out || "-"
                    )}
                  </td>

                  {/* Status cell (trust backend, but show None while mid-shift) */}
                  <td className="border px-4 py-2">{renderStatus(row)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-center text-xs text-gray-500 mt-6">
        © Copyright © PineSucceed Pvt. Ltd 2025
      </div>
    </div>
  );
}
