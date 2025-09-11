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
      const res = await axios.get(`${API_URL}/attendance?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let records = res.data.data || [];
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
            attendance_status: "Absent",
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
        `${API_URL}/attendance/checkin`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message || "Checked in!");
      await fetchAttendance();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to check in");
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/attendance/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message || "Checked out successfully!");
      await fetchAttendance();
    } catch (err) {
      toast.error(err.response?.data?.message || "Check-out failed");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

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
    <div
      className="min-h-screen bg-[#d9e0e8] text-gray-800 rounded-2xl shadow-md  
        dark:bg-neutral-900 dark:text-white p-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold  mb-4 md:mb-0">Attendance Records</h1>
      </div>

      {/* Table View */}
      <div className="hidden h-screen rounded-2xl md:block overflow-x-auto mt-10">
        <table className="w-full    bg-gray-100/90 dark:bg-neutral-900 ">
          <thead className="bg-neutral-800/80   uppercase  text-gray-300">
            <tr className="text-sm  font-semibold">
              <th className="p-3">Date</th>
              <th className="p-3">Day</th>
              <th className="p-3">Check-in</th>
              <th className="p-3">Check-out</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? (
              attendance.map((row, idx) => {
                const isToday =
                  new Date(row.date).toDateString() ===
                  new Date().toDateString();

                return (
                  <tr
                    key={idx}
                    className=" border-t border-gray-700 text-center hover:bg-neutral-800/70 "
                  >
                    <td className="p-3">
                      {new Date(row.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">{row.day}</td>
                    <td className="p-3">
                      {isToday && !row.check_in ? (
                        <button
                          onClick={handleCheckIn}
                          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg"
                        >
                          Check In
                        </button>
                      ) : (
                        row.check_in || "-"
                      )}
                    </td>
                    <td className="p-3">
                      {isToday && row.check_in && !row.check_out ? (
                        <button
                          onClick={handleCheckOut}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
                        >
                          Check Out
                        </button>
                      ) : (
                        row.check_out || "-"
                      )}
                    </td>
                    <td className="p-3">{renderStatus(row)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="grid md:hidden gap-4">
          {attendance.length > 0 ? (
            attendance.map((row, idx) => {
              const isToday =
                new Date(row.date).toDateString() === new Date().toDateString();

              return (
                <div
                  key={idx}
                  className="bg-neutral-900/70 p-4 rounded-xl shadow-md border border-neutral-700"
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(row.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Day:</strong> {row.day}
                  </p>
                  <p>
                    <strong>Check-in:</strong>{" "}
                    {isToday && !row.check_in ? (
                      <button
                        onClick={handleCheckIn}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg"
                      >
                        Check In
                      </button>
                    ) : (
                      row.check_in || "-"
                    )}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{" "}
                    {isToday && row.check_in && !row.check_out ? (
                      <button
                        onClick={handleCheckOut}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
                      >
                        Check Out
                      </button>
                    ) : (
                      row.check_out || "-"
                    )}
                  </p>
                  <p>
                    <strong>Status:</strong> {renderStatus(row)}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400">No records found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
