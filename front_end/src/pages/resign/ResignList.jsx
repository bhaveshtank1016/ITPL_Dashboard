import { useEffect, useState } from "react";
import { FaInbox, FaPen } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import PagePagination from "./PagePagination";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";
import { CalendarDays, FileText, CheckCircle, XCircle, Clock } from "lucide-react";

function ResignList() {
  const [page, setPage] = useState(1);
  const [resign, setResign] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [hrs, setHrs] = useState([]); // HR list
  const { user } = useAuth();
  const userRole = user?.role?.name?.toLowerCase();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchResign = async () => {
    try {
      const query = new URLSearchParams({ page });
      if (startDate) query.append("startDate", startDate);
      if (endDate) query.append("endDate", endDate);
      const res = await fetch(`${API_URL}/resign/list?${query.toString()}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setResign(data.list || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch resigns", error);
    }
  };

  const fetchHRs = async () => {
    try {
      const res = await fetch(`${API_URL}/user/hr`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setHrs(data || []);
    } catch (error) {
      console.error("Failed to fetch HRs:", error);
      toast.error("Failed to fetch HRs");
    }
  };

  useEffect(() => {
    fetchResign();
    fetchHRs();
  }, [page]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/resign/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Resignation ${newStatus} successfully`);
        fetchResign();
      } else {
        toast.error(data.msg || "Something went wrong");
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status");
    }
  };

  const getHRName = (from) => {
    const hr = hrs.find((h) => h._id === from || h.name === from);
    return hr ? hr.name : from || "-";
  };

  return (
    <div
      className="min-h-screen bg-[#d9e0e8] text-gray-800 shadow-md  
            dark:bg-neutral-900 dark:text-white p-6 p-4 md:p-6"
    >
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-xl mb-6 sm:text-2xl font-semibold">Resign Section</h2>

      {/* Top buttons */}
      <div className="flex flex-col md:flex-row justify-between mb-5 gap-4">
        <div className="flex flex-wrap gap-2">
          <button className="border px-3 py-2 flex gap-2 items-center text-white bg-blue-900 rounded-md">
            <FaInbox /> Inbox
          </button>
          <button className="border px-3 py-2 flex gap-2 items-center text-white bg-blue-900 rounded-md">
            <LuSend /> Sent
          </button>
          <button className="border px-3 py-2 flex gap-2 items-center text-white bg-blue-900 rounded-md">
            <FaPen /> Compose
          </button>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <label className="font-bold">Start Date</label>
          <input
            type="date"
            className="border h-10 rounded-md  px-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label className="font-bold">End Date</label>
          <input
            type="date"
            className="border h-10 rounded-md  px-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button
            className="bg-blue-900 text-white px-4 py-2 rounded"
            onClick={() => fetchResign()}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className=" overflow-x-auto rounded-lg shadow-lg">
        <table className="hidden md:table min-w-full  rounded-xl overflow-hidden">
          <thead className="bg-neutral-800/80 uppercase text-gray-300">
            <tr className="text-center text-sm font-semibold">
              <th className="p-3">No.</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              {["admin", "hr"].includes(userRole) && (
                <th className="p-3">Position</th>
              )}
              <th className="p-3">Subject</th>
              <th className="p-3">HR</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              {["admin", "hr"].includes(userRole) && (
                <th className="p-3">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {resign.map((item, index) => (
              <tr
                className="border-t border-neutral-700 text-center hover:bg-neutral-800/70 transition"
                key={item._id || index}
              >
                <td className="p-3">
                  {(page - 1) * 10 + index + 1}
                </td>
                <td className="p-3">
                  {item.userId?.name || "-"}
                </td>
                <td className="p-3">
                  {item.userId?.role?.name || "-"}
                </td>
                {["admin", "hr"].includes(userRole) && (
                  <td className="p-3">
                    {item.userId?.position || "-"}
                  </td>
                )}
                <td className="p-3">
                  {item.subject}
                </td>
                <td className="p-3">
                  {getHRName(item.from)}
                </td>
                <td className="p-3">
                  {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                </td>
                <td className="p-3">
                  <span
                    className={
                      item.status === "approved"
                        ? "text-green-900"
                        : item.status === "rejected"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }
                  >
                    {item.status || "pending"}
                  </span>
                </td>
                {["admin", "hr"].includes(userRole) && (
                  <td className="p-3">
                    {item.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(item._id, "approved")
                          }
                          className="text-green-500 px-2 py-1 rounded mr-2"
                        >
                        <CheckCircle />
                          
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(item._id, "rejected")
                          }
                          className=" px-2 py-1 rounded"
                        >
                           <XCircle className=" text-red-500" />
                        </button>
                      </>
                    )}
                    {item.status === "rejected" && (
                      <button
                        onClick={() => handleStatusChange(item._id, "approved")}
                        className="bg-green-600 text-green-500 px-2 py-1 rounded"
                      >
                        <CheckCircle />
                      </button>
                    )}
                    {item.status === "approved" && (
                      <button
                        onClick={() => handleStatusChange(item._id, "rejected")}
                        className=" px-2 py-1 rounded"
                      >
                         <XCircle className=" text-red-500" />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {resign.map((item, index) => (
          <div
            key={item._id || index}
            className="bg-neutral-900/60 p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">{item.userId?.name || "-"}</h3>
              <span
                className={
                  item.status === "approved"
                    ? "text-green-500 font-semibold"
                    : item.status === "rejected"
                    ? "text-red-500 font-semibold"
                    : "text-yellow-500 font-semibold"
                }
              >
                {item.status || "pending"}
              </span>
            </div>
            <p>
              <strong>Role:</strong> {item.userId?.role?.name || "-"}
            </p>
            {["admin", "hr"].includes(userRole) && (
              <p>
                <strong>Position:</strong> {item.userId?.position || "-"}
              </p>
            )}
            <p>
              <strong>Subject:</strong> {item.subject}
            </p>
            <p>
              <strong>HR:</strong> {getHRName(item.from)}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {item.date ? new Date(item.date).toLocaleDateString() : "-"}
            </p>
            {["admin", "hr"].includes(userRole) && (
              <div className="flex flex-wrap gap-2 mt-2">
                {item.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(item._id, "approved")}
                      className="bg-green-600 px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(item._id, "rejected")}
                      className="bg-red-600 px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
                {item.status === "approved" && (
                  <button
                    onClick={() => handleStatusChange(item._id, "rejected")}
                    className="bg-red-600 px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                )}
                {item.status === "rejected" && (
                  <button
                    onClick={() => handleStatusChange(item._id, "approved")}
                    className="bg-green-600 px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <PagePagination setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default ResignList;
