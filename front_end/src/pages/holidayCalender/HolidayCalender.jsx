import React, { useEffect, useState } from "react";
import AddHolidays from "./AddHolidays";

const Holiday = () => {
  const [holidays, setHolidays] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

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

  return (
    <div className="sm:p-6 min-h-screen rounded-md bg-black text-gray-200">
      <h2 className="text-xl pb-3 rounded-md sm:text-2xl font-semibold mb-4">
        All Official Holidays
      </h2>

      <div className="flex sm:text-base rounded-md justify-between p-5 bg-neutral-900">
        <input
          className="border rounded-md mb-5 px-3 h-13 font-bold text-xl py-2"
          type="text"
          value={"2025"}
          readOnly
        />
        <div className="flex flex-col">
          <button
            className="border rounded-md mb-5 px-3 font-bold text-start text-xl py-2"
            type="button"
            onClick={() => {
              setIsEdit(false);
              setEditData(null);
              setShowModel(true);
            }}
          >
            Add Holiday
          </button>
          <input
            className="border rounded-md mb-5 px-3 font-bold text-xl py-2"
            type="text"
            value={"Search"}
            readOnly
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

      <div className="overflow-x-auto p-5 bg-neutral-900">
        <table className="table-auto w-full border-collapse border border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-700 px-4 py-2">Sr.No</th>
              <th className="border border-gray-700 px-4 py-2">Holiday Name</th>
              <th className="border border-gray-700 px-4 py-2">Date</th>
              <th className="border border-gray-700 px-4 py-2">Weekday</th>
              <th className="border border-gray-700 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr className="text-center" key={holiday._id}>
                <td className="border border-gray-700 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-700 px-4 py-2">{holiday.name}</td>
                <td className="border border-gray-700 px-4 py-2">{holiday.date}</td>
                <td className="border border-gray-700 px-4 py-2">{holiday.weekday}</td>
                <td className="border border-gray-700 px-4 py-2">
                  <button
                    className="px-2 py-1 bg-blue-600 rounded"
                    onClick={() => handleEdit(holiday)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holiday;
