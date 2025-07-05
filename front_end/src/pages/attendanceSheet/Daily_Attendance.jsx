import React from "react";

const attendanceData = [
  { no: 1, date: "30-06-2025", day: "Monday", checkout: "", remark: "A" },
  { no: 2, date: "29-06-2025", day: "Sunday", checkout: "", remark: "Week Off" },
  { no: 3, date: "28-06-2025", day: "Saturday", checkout: "", remark: "Week Off" },
  { no: 4, date: "27-06-2025", day: "Friday", checkout: "", remark: "A" },
  { no: 5, date: "26-06-2025", day: "Thursday", checkout: "", remark: "A" },
  { no: 6, date: "25-06-2025", day: "Wednesday", checkout: "", remark: "A" },
  { no: 7, date: "24-06-2025", day: "Tuesday", checkout: "", remark: "A" },
  { no: 8, date: "23-06-2025", day: "Monday", checkout: "", remark: "A" },
  { no: 9, date: "22-06-2025", day: "Sunday", checkout: "", remark: "Week Off" },
  { no: 10, date: "21-06-2025", day: "Saturday", checkout: "", remark: "Week Off" },
];

const getRemarkBadge = (remark) => {
  if (remark === "Week Off") return "bg-green-500 text-white";
  if (remark === "A") return "bg-red-600 text-white";
  return "";
};

export default function Daily_Attendance() {
  return (
    <div className="min-h-screen text-white rounded-md p-5 bg-black">
        <h2 className="text-2xl font-bold  mb-4">Employee Attendance Records</h2>
      <div className="shadow-md  bg-neutral-800 mx-auto rounded-md p-4">

        {/* Filter Section */}
        <div className="flex  flex-wrap items-center gap-4 mb-4">
          <input type="text" value="June" readOnly className="border p-2 rounded-md" />
          <input type="text" value="2025" readOnly className="border p-2 rounded-md" />
          <div className="ml-auto">
            <label className="font-semibold mr-2">Search:</label>
            <input type="text" placeholder="Search..." className="border p-2 rounded-md" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="min-w-full border border-gray-300 text-md">
            <thead className="bg-neutral-950">
              <tr className="text-start">
                <th className="border px-6 py-4">Sr. No.</th>
                <th className="border px-6 py-4">Date</th>
                <th className="border px-6 py-4">Check-in</th>
                <th className="border px-6 py-4">Check-out</th>
                <th className="border px-6 py-4">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-500 text-center">
                  <td className="border px-4 py-2">{row.no}</td>
                  <td className="border px-4 py-2">{row.date}</td>
                  <td className="border px-4 py-2">{row.day}</td>
                  <td className="border px-4 py-2">{row.checkout || "-"}</td>
                  <td className="border px-4 py-2">
                    <span className={`px-3 py-1 rounded-full font-semibold ${getRemarkBadge(row.remark)}`}>
                      {row.remark === "A" ? "❌ A" : "✅ Week Off"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-6">
          © Copyright © PineSucceed Pvt. Ltd 2025
        </div>
      </div>
    </div>
  );
}
