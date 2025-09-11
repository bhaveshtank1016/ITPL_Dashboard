import React from "react";

const summaryData = [
  { icon: "👥", label: "Total Employees", value: 99, bg: "bg-blue-100", text: "text-blue-600" },
  { icon: "🏢", label: "Departments", value: 5, bg: "bg-purple-100", text: "text-purple-600" },
  { icon: "📁", label: "Projects", value: 8, bg: "bg-green-100", text: "text-green-600" },
  { icon: "⏳", label: "Pending Requests", value: 4, bg: "bg-orange-100", text: "text-orange-600" },
];

const latestProjects = [
  { name: "Project Alpha", deadline: "June 10", status: "Completed", statusColor: "bg-green-100 text-green-700" },
  { name: "Project Beta", deadline: "May 30", status: "In Progress", statusColor: "bg-yellow-100 text-yellow-700" },
  { name: "Project Gamma", deadline: "June 15", status: "Pending", statusColor: "bg-gray-100 text-gray-700" },
];

const pendingRequests = [
  { requester: "John Doe", date: "June 3" },
  { requester: "Jane Smith", date: "June 1" },
  { requester: "Mike Johnson", date: "May 28" },
];

export default function Dashboard() {
  return (
    <div className="p-6 min-h-screen bg-[#d9e0e8] dark:bg-neutral-900 rounded-lg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summaryData.map(({ icon, label, value, bg, text }) => (
          <div
            key={label}
            className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <div className={`${bg} p-3 rounded-lg text-3xl`}>
              <span className={text}>{icon}</span>
            </div>
            <div>
              <div className="text-sm font-medium">{label}</div>
              <div className="text-2xl font-bold">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Large Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Employees Chart */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold mb-4">New Employees</h2>
            <div className="h-48 bg-gradient-to-t from-blue-300 to-transparent rounded-lg"></div>
            {/* Chart placeholder */}
          </div>

          {/* Latest Projects Table */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Latest Projects</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                Filter <span>▼</span>
              </div>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Deadline</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestProjects.map(({ name, deadline, status, statusColor }) => (
                  <tr key={name} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                    <td className="py-2">{name}</td>
                    <td className="py-2">{deadline}</td>
                    <td className="py-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Department Distribution */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold mb-4">Department Distribution</h2>
            <div className="h-48 flex justify-center items-center text-gray-400 dark:text-gray-500">
              Donut Chart Here
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {pendingRequests.map(({ requester, date }, idx) => (
                <div key={idx} className="flex justify-between py-2 items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-6 h-6 flex justify-center items-center text-xs text-gray-600 dark:text-gray-300">
                      {idx + 1}
                    </div>
                    <span className="font-medium">{requester}</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">{date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
