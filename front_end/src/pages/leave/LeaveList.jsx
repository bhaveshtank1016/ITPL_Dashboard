import { useEffect, useState } from "react";
import { FaInbox, FaPen } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import PageLeavePagination from "./PageLeavePagination";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";
import { CalendarDays, FileText, CheckCircle, XCircle, Clock } from "lucide-react";

function LeaveList() {
  const [page, setPage] = useState(1);
  const [leaveList, setLeaveList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const userRole = user?.role?.name?.toLowerCase();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeaves = async () => {
    try {
      const res = await fetch(`${API_URL}/show?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setLeaveList(data.list || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch leaves", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [page]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/update/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Leave ${newStatus} successfully`);
        fetchLeaves();
      } else {
        toast.error(data.msg || "Something went wrong");
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status");
    }
  };

  const filteredLeaves = leaveList.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.subject?.toLowerCase().includes(search) ||
      item.user?.name?.toLowerCase().includes(search) ||
      item.user?.role?.name?.toLowerCase().includes(search)
    );
  });

  return (
    <div
      className="min-h-screen bg-[#d9e0e8] text-gray-800 shadow-md  
            dark:bg-neutral-900 dark:text-white p-6 rounded-xl "
    >
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-3xl font-bold  mb-8">Leave Section</h2>
      <div className="flex justify-between">
        {" "}
        <div className="flex justify-end mb-6 space-x-3">
          <button className="px-4 py-2 flex items-center gap-2 text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-md transition">
            <FaInbox /> Inbox
          </button>
          <button className="px-4 py-2 flex items-center gap-2 text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-md transition">
            <LuSend /> Sent
          </button>
          <button className="px-4 py-2 flex items-center gap-2 text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-md transition">
            <FaPen /> Compose
          </button>
        </div>
        {/* Search */}
        <div className="flex justify-end items-center mb-6">
          <label className="font-semibold text-lg mr-3">Search</label>
          <input
            type="text"
            value={searchTerm} // ✅ bind kiya
            onChange={(e) => setSearchTerm(e.target.value)} // ✅ update
            className="px-3 py-2 w-64 rounded-lg bg-neutral-600 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by subject or name..."
          />
        </div>
      </div>
      {/* Top buttons */}

      {/* Table */}
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
              <th className="p-3">Leave From</th>
              <th className="p-3">Leave To</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              {["admin", "hr"].includes(userRole) && (
                <th className="p-3">Action</th>
              )}
            </tr>
          </thead>

          <tbody className="">
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((item, index) => (
                <tr
                  className="border-t border-neutral-700 text-center hover:bg-neutral-800/70 transition"
                  key={item._id || index}
                >
                  <td className="p-3">{(page - 1) * 10 + index + 1}</td>
                  <td className="p-3">{item.user?.name || "-"}</td>
                  <td className="p-3">{item.user?.role?.name || "-"}</td>
                  {["admin", "hr"].includes(userRole) && (
                    <td className="p-3">{item.user?.position || "-"}</td>
                  )}
                  <td className="p-3">{item.subject}</td>
                  <td className="p-3">{item.from}</td>
                  <td className="p-3">{item.leave}</td>
                  <td className="p-3">
                    {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`font-semibold ${
                        item.status === "approved"
                          ? "text-green-400"
                          : item.status === "rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
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
                            className="text-green-500  px-3 py-1 rounded-lg mr-2"
                          >
                            <CheckCircle />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(item._id, "rejected")
                            }
                            className=" px-3 py-1 rounded-lg"
                          >
                            <XCircle className=" text-red-500" />
                          </button>
                        </>
                      )}
                      {item.status === "rejected" && (
                        <button
                          onClick={() =>
                            handleStatusChange(item._id, "approved")
                          }
                          className="text-green-600  hover:bg-green-700 px-3 py-1 rounded-lg"
                        >
                          <CheckCircle />
                        </button>
                      )}
                      {item.status === "approved" && (
                        <button
                          onClick={() =>
                            handleStatusChange(item._id, "rejected")
                          }
                          className=" px-3 py-1 rounded-lg"
                        >
                          <XCircle className=" text-red-500" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={["admin", "hr"].includes(userRole) ? 10 : 9}
                  className="py-6 text-center text-gray-400"
                >
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex  justify-center items-center mt-6">
          <PageLeavePagination setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default LeaveList;
