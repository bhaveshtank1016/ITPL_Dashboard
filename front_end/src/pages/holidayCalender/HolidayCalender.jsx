import React, { useEffect, useState } from "react";
import AddHolidays from "./AddHolidays";

const Holiday = () => {
  const [holidays, setHolidays] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const holidaysPerPage = 10; // Fixed 10 per page

  // ✅ Get role name from user object in localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = (user?.role?.name || "").toLowerCase();

  const fetchHolidays = async () => {
    try {
      const res = await fetch("http://localhost:8001/api/holidays");
      const data = await res.json();
      setHolidays(data);
    } catch (error) {
      console.error("Failed to fetch holidays", error);
    }
  };

  const handleEdit = (holiday) => {
    setEditData(holiday);
    setIsEdit(true);
    setShowModel(true);
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // ✅ Filter holidays by search term
  const filteredHolidays = holidays.filter(
    (holiday) =>
      holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.weekday.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const indexOfLastHoliday = currentPage * holidaysPerPage;
  const indexOfFirstHoliday = indexOfLastHoliday - holidaysPerPage;
  const currentHolidays = filteredHolidays.slice(
    indexOfFirstHoliday,
    indexOfLastHoliday
  );

  const totalPages = Math.ceil(filteredHolidays.length / holidaysPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="sm:p-6 min-h-screen rounded-md bg-black text-gray-200">
      <h2 className="text-xl pb-3 rounded-md sm:text-2xl font-semibold mb-4">
        All Official Holidays
      </h2>

      <div className="flex sm:text-base rounded-md justify-between p-5 bg-gradient-to-r from-neutral-900 to-blue-900 ">
        <input
          className="border rounded-md mb-5 px-3 bg-neutral-800 h-13 font-bold text-xl py-2"
          type="text"
          value={"2025"}
          readOnly
        />
        <div className="flex flex-col">
          {/* ✅ Show Add button only for admin/hr */}
          {(userRole === "admin" || userRole === "hr") && (
            <button
              className="border rounded-md bg-neutral-800 mb-5 px-3 font-bold text-start text-xl py-2"
              type="button"
              onClick={() => {
                setIsEdit(false);
                setEditData(null);
                setShowModel(true);
              }}
            >
              Add Holiday
            </button>
          )}
          {/* 🔍 Search Box */}
          <input
            className="border rounded-md bg-neutral-800 mb-5 px-3 font-bold text-xl py-2"
            type="text"
            placeholder="Search holidays..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset to page 1 when searching
            }}
          />
          {showModel && (
            <AddHolidays
              onClose={() => {
                setShowModel(false);
                setIsEdit(false);
                setEditData(null);
              }}
              fetchData={fetchHolidays}
              editData={editData}
              isEdit={isEdit}
            />
          )}
        </div>
      </div>

      <div className="overflow-x-auto p-5 bg-gradient-to-r from-neutral-900 to-blue-900">
        <table className="min-w-full border rounded-md border-gray-300 text-md">
          <thead className="bg-neutral-950">
            <tr className="text-center">
              <th className="border px-6 py-4">Sr.No</th>
              <th className="border px-6 py-4">Holiday Name</th>
              <th className="border px-6 py-4">Date</th>
              <th className="border px-6 py-4">Weekday</th>
              {(userRole === "admin" || userRole === "hr") && (
                <th className="border px-6 py-4">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentHolidays.length > 0 ? (
              currentHolidays.map((holiday, index) => (
                <tr
                  className="hover:bg-gray-500 text-center"
                  key={holiday._id}
                >
                  <td className="border px-4 py-2">
                    {indexOfFirstHoliday + index + 1}
                  </td>
                  <td className="border px-4 py-2">{holiday.name}</td>
                  <td className="border px-4 py-2">{holiday.date}</td>
                  <td className="border px-4 py-2">{holiday.weekday}</td>
                  {(userRole === "admin" || userRole === "hr") && (
                    <td className="border px-4 py-2">
                      <button
                        className="px-2 py-1 bg-blue-600 rounded"
                        onClick={() => handleEdit(holiday)}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No holidays found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Holiday;
