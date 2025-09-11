import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FaTrophy, FaExclamationCircle, FaDollarSign, FaUniversity } from "react-icons/fa";

const data = [
  { name: "Present", value: 10, color: "#22c55e" }, // green
  { name: "Leaves", value: 2, color: "#f97316" },   // orange
  { name: "Half Day", value: 0, color: "#3b82f6" }, // blue
  { name: "Late Attendance", value: 4, color: "#a855f7" }, // purple
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Heading */}
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo1.png"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-bold">Shubham Badaya</h2>
              <p className="text-sm text-gray-500">SDE I • Development</p>
            </div>
          </div>
          <p><strong>Phone Number:</strong> +91 94618 44672</p>
          <p><strong>Email:</strong> Shubham190825@appentus.in</p>
          <p><strong>Address:</strong> -</p>
          <p><strong>Joining Date:</strong> 2025-08-19</p>
        </div>

        {/* Attendance Details */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-semibold mb-2">Attendance Details</h2>
          <div className="h-40">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 text-sm">
            {data.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: d.color }}
                ></span>
                {d.value} {d.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Leave Details */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-semibold mb-2">Leave Details</h2>
          <p>Total Leaves: 2</p>
          <p>Approved: 2</p>
          <p>Rejected: 0</p>
          <p>Pending: 0</p>
          <p>Paid Leaves: 0</p>
          <p>Unpaid Leaves: 2</p>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Apply New Leave
          </button>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <FaTrophy className="text-purple-600 text-2xl mb-2" />
          <p className="font-bold text-lg">0</p>
          <p className="text-gray-500">Appreciations</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <FaExclamationCircle className="text-blue-600 text-2xl mb-2" />
          <p className="font-bold text-lg">0</p>
          <p className="text-gray-500">Warnings</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <FaDollarSign className="text-green-600 text-2xl mb-2" />
          <p className="font-bold text-lg">0</p>
          <p className="text-gray-500">Expenses</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <FaUniversity className="text-red-600 text-2xl mb-2" />
          <p className="font-bold text-lg">0</p>
          <p className="text-gray-500">Complaints</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
