import React from "react";

const summaryData = [
  { icon: "👥", label: "Total Employees", value: 99, bg: "bg-blue-100", text: "text-blue-600" },
  { icon: "🏢", label: "Departments", value: 5, bg: "bg-purple-100", text: "text-purple-600" },
  { icon: "📁", label: "Projects", value: 8, bg: "bg-green-100", text: "text-green-600" },
  { icon: "⏳", label: "Pending Requests", value: 4, bg: "bg-orange-100", text: "text-orange-600" },
];

const latestProjects = [
  { name: "Project Alpha", deadline: "June 10", status: "Completed", statusColor: "bg-green-100 text-green-700" },
  { name: "Project Beta", deadline: "May 30", status: "In Progress", statusColor: "bg-orange-100 text-orange-700" },
  { name: "Project Gamma", deadline: "June 15", status: "Pending", statusColor: "bg-gray-100 text-gray-700" },
];

const pendingRequests = [
  { requester: "John Doe", date: "June 3" },
  { requester: "Jane Smith", date: "June 1" },
  { requester: "Mike Johnson", date: "May 28" },
];

export default function Dashboard() {
  return (
    <div className="p-6 bg-black rounded-2xl min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summaryData.map(({ icon, label, value, bg, text }) => (
          <div key={label} className="bg-neutral-600 text-white p-4 rounded-lg shadow flex items-center gap-4">
            <div className={`${bg} p-3 rounded-lg text-2xl`}>
              <span className={text}>{icon}</span>
            </div>
            <div>
              <div className=" text-sm">{label}</div>
              <div className="text-xl font-semibold">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Large Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Employees Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">New Employees</h2>
            <div className="h-48 bg-gradient-to-t from-blue-200 to-transparent rounded"></div>
            {/* Replace above div with chart later */}
          </div>

          {/* Latest Projects */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Latest Projects</h2>
              <div className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">Local <span>▼</span></div>
            </div>
            <table className="w-full text-left text-sm text-gray-700">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Deadline</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestProjects.map(({ name, deadline, status, statusColor }) => (
                  <tr key={name} className="border-b border-gray-100">
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
          {/* Department Distribution (donut chart placeholder) */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Department Distribution</h2>
            <div className="h-48 flex justify-center items-center text-gray-400">Donut Chart Here</div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>
            <div className="divide-y divide-gray-100">
              {pendingRequests.map(({ requester, date }) => (
                <div key={requester} className="flex justify-between py-2 items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 rounded-full w-6 h-6 flex justify-center items-center text-xs text-gray-600">3</div>
                    <span className="font-semibold">{requester}</span>
                  </div>
                  <div className="text-gray-500">{date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
