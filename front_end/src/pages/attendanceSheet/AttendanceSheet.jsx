import React from "react";

const attendanceData = [
  { no: 1, day: "Thursday", date: "01 May 2025", checkIn: "A", checkOut: "A", status: "Absent" },
  { no: 2, day: "Thursday", date: "08 May 2025", checkIn: "09:46 AM", checkOut: "19:14 PM", status: "Full Day" },
  { no: 3, day: "Saturday", date: "10 May 2025", checkIn: "WO-II", checkOut: "WO-II", status: "WO-II" },
  { no: 4, day: "Thursday", date: "01 May 2025", checkIn: "A", checkOut: "A", status: "Absent" },
  { no: 5, day: "Thursday", date: "08 May 2025", checkIn: "09:46 AM", checkOut: "19:14 PM", status: "Full Day" },
  { no: 6, day: "Saturday", date: "10 May 2025", checkIn: "WO-II", checkOut: "WO-II", status: "WO-II" },
  { no: 7, day: "Thursday", date: "01 May 2025", checkIn: "A", checkOut: "A", status: "Absent" },
  { no: 8, day: "Thursday", date: "08 May 2025", checkIn: "09:46 AM", checkOut: "19:14 PM", status: "Full Day" },
  { no: 9, day: "Saturday", date: "10 May 2025", checkIn: "WO-II", checkOut: "WO-II", status: "WO-II" },
  { no: 10, day: "Saturday", date: "10 May 2025", checkIn: "WO-II", checkOut: "WO-II", status: "WO-II" },
];

function Punch_Details() {
  return (
    <div className="bg-black text-white min-h-screen rounded-md mx-auto p-5">
      <h1 className="text-2xl p-3 rounded-md">Attendance List</h1>
      <div className="mt-3 p-3 rounded-md bg-gradient-to-r from-neutral-900 to-blue-900">
        <div className="flex items-center gap-5 flex-wrap">
          <input type="text" value="May" readOnly className="border rounded-md text-white p-2 bg-neutral-800" />
          <input type="text" value="2025" readOnly className="border rounded-md text-white p-2 bg-neutral-800" />
          <div>
            <span className="mr-4 font-bold">
              Sudden Leave: <span className="text-red-600">0</span>
            </span>
            <span className="font-bold">
              Leave Balance: <span className="text-green-600">0</span>
            </span>
          </div>
        </div>
        <div className="text-end my-4 ">
          <label className="text-lg font-bold mr-2">Search:</label>
          <input type="text" className="border p-2 rounded-md bg-neutral-800 text-white" />
        </div>
        <table className="bg-gradient-to-r from-neutral-900 to-blue-900 w-full border-collapse border rounded-md">
          <thead className="bg-neutral-950 text-xl">
            <tr>
              <th className="border px-2 py-1">No.</th>
              <th className="border px-2 py-1">Day Name</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Check In</th>
              <th className="border px-2 py-1">Check Out</th>
              <th className="border px-2 py-1">Attendance Status</th>
            </tr>
          </thead>
          <tbody className="">
            {attendanceData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border px-6 py-3">{row.no}</td>
                <td className="border px-6 py-3">{row.day}</td>
                <td className="border px-6 py-3">{row.date}</td>
                <td className="border px-6 py-3">{row.checkIn}</td>
                <td className="border px-6 py-3">{row.checkOut}</td>
                <td className="border px-6 py-3">
                  <span className={`px-2 py-1 rounded font-semibold
                    ${row.status === 'Absent' ? 'text-red-600 ' : ''}
                    ${row.status === 'Full Day' ? 'text-green-600' : ''}
                    ${row.status.includes('WO') ? 'text-yellow-400 ' : ''}
                  `}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Punch_Details;
