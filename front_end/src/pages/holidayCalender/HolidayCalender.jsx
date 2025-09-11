import React, { useEffect, useState } from "react";
import AddHolidays from "./AddHolidays";
import { RiEdit2Line } from "react-icons/ri";

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
    <div
      className="min-h-screen bg-[#d9e0e8] text-gray-800 shadow-md  
        dark:bg-neutral-900 dark:text-white p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-wide">Official Holidays</h2>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
          {/* Year Display */}
          <input
            className="border border-neutral-700 rounded-lg px-4 py-2 bg-neutral-800/80 text-gray-200 font-semibold w-28 text-center"
            type="text"
            value={"2025"}
            readOnly
          />

          {/* Add Button (only for admin/hr) */}
          {(userRole === "admin" || userRole === "hr") && (
            <button
              className="bg-blue-900 text-white hover:bg-blue-700 transition px-5 py-2 rounded-lg font-semibold shadow-md"
              onClick={() => {
                setIsEdit(false);
                setEditData(null);
                setShowModel(true);
              }}
            >
              Add Holiday
            </button>
          )}

          {/* Search */}
          <input
            className="border border-neutral-700 rounded-lg px-4 py-2 bg-neutral-800/80 text-gray-50 font-medium placeholder-gray-400 w-60"
            type="text"
            placeholder="🔍 Search holidays..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Add / Edit Modal */}
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

      {/* Table */}
      <div className=" overflow-x-auto rounded-lg shadow-lg">
        <table className="hidden md:table min-w-full  rounded-xl overflow-hidden">
          <thead className="bg-neutral-800/80 uppercase text-gray-300">
            <tr className="text-center text-sm font-semibold">
              <th className="p-3">S. No</th>
              <th className="p-3">Holiday</th>
              <th className="p-3">Date</th>
              <th className="p-3">Weekday</th>
              {(userRole === "admin" || userRole === "hr") && (
                <th className="p-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentHolidays.length > 0 ? (
              currentHolidays.map((holiday, index) => (
                <tr
                  key={holiday._id}
                  className="border-t border-neutral-700 text-center hover:bg-neutral-800/70 transition"
                >
                  <td className="p-3">{indexOfFirstHoliday + index + 1}</td>
                  <td className="p-3 font-medium">{holiday.name}</td>
                  <td className="p-3">{holiday.date}</td>
                  <td className="p-3">{holiday.weekday}</td>
                  {(userRole === "admin" || userRole === "hr") && (
                    <td className="p-3">
                      <button
                        className="px-3 py-1  hover:bg-blue-700 rounded-lg text-sm font-semibold"
                        onClick={() => handleEdit(holiday)}
                      >
                        <RiEdit2Line size={20} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 font-medium"
                >
                  🚫 No holidays found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex   justify-center mt-6 gap-2 flex-wrap">
          <button
            className="px-3 py-1  hover:bg-neutral-700 rounded-lg disabled:opacity-40"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-lg font-medium ${
                currentPage === index + 1
                  ? "bg-blue-900 text-white"
                  : " hover:bg-neutral-700"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="px-3 py-1  hover:bg-neutral-700 rounded-lg disabled:opacity-40"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Holiday;
