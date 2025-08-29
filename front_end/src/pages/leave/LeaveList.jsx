import { useEffect, useState } from "react";
import { FaInbox, FaPen } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import PageLeavePagination from "./PageLeavePagination";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";

function LeaveList() {
  const [page, setPage] = useState(1);
  const [leaveList, setLeaveList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const userRole = user?.role?.name?.toLowerCase();

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
    const res = await fetch(`${API_URL}/leave/update/${id}/status`, {
      method: "PUT", // ✅ matches backend
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(`Leave ${newStatus} successfully`);
      fetchLeaves(); // refresh list after update
    } else {
      toast.error(data.msg || "Something went wrong");
    }
  } catch (error) {
    console.error("Failed to update status", error);
    toast.error("Failed to update status");
  }
};


  return (
    <div className="h-screen bg-black text-white p-5 rounded-md">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-xl mb-10 pb-3 rounded-md sm:text-2xl font-semibold">
        Leave Section
      </h2>

      {/* Top buttons */}
      <div className="flex justify-end">
        <button className="border mr-2 px-4 py-2 flex gap-3 items-center bg-blue-700 rounded-md">
          <FaInbox /> Inbox
        </button>
        <button className="border mr-2 px-4 py-2 flex gap-3 items-center bg-blue-700 rounded-md">
          <LuSend /> Sent
        </button>
        <button className="border px-4 py-2 flex gap-3 items-center bg-blue-700 rounded-md">
          <FaPen /> Compose
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-end mt-5">
        <label className="font-bold text-xl mr-3">Search</label>
        <input
          type="text"
          className="border h-10 rounded-md w-60 text-black px-2"
          placeholder="Search by subject or from..."
        />
      </div>

      {/* Table */}
      <div>
        <table className="table-auto mt-10 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="text-center border">
              <th className="border border-gray-700 text-lg px-4 py-2">No.</th>
              <th className="border border-gray-700 text-lg px-4 py-2">Name</th>
              <th className="border border-gray-700 text-lg px-4 py-2">Role</th>

              {/* Position column - only for Admin & HR */}
              {["admin", "hr"].includes(userRole) && (
                <th className="border border-gray-700 text-lg px-4 py-2">
                  Position
                </th>
              )}

              <th className="border border-gray-700 text-lg px-4 py-2">
                Subject
              </th>
              <th className="border border-gray-700 text-lg px-4 py-2">
                Leave From
              </th>
              <th className="border border-gray-700 text-lg px-4 py-2">
                Leave To
              </th>
              <th className="border border-gray-700 text-lg px-4 py-2">
                Date
              </th>
              <th className="border border-gray-700 text-lg px-4 py-2">
                Status
              </th>

              {["admin", "hr"].includes(userRole) && (
                <th className="border border-gray-700 text-lg px-4 py-2">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {leaveList.map((item, index) => (
              <tr className="text-center border" key={item._id || index}>
                <td className="border border-gray-700 px-4 py-2">
                  {(page - 1) * 10 + index + 1}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {item.user?.name || "-"}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {item.user?.role?.name || "-"}
                </td>

                {["admin", "hr"].includes(userRole) && (
                  <td className="border border-gray-700 px-4 py-2">
                    {item.user?.position || "-"}
                  </td>
                )}

                <td className="border border-gray-700 px-4 py-2">
                  {item.subject}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {item.from}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {item.leave}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  <span
                    className={
                      item.status === "approved"
                        ? "text-green-500"
                        : item.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {item.status || "pending"}
                  </span>
                </td>

                {["admin", "hr"].includes(userRole) && (
                  <td className="border border-gray-700 px-4 py-2">
                    {item.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(item._id, "approved")
                          }
                          className="bg-green-600 px-2 py-1 rounded mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(item._id, "rejected")
                          }
                          className="bg-red-600 px-2 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {item.status === "rejected" && (
                      <button
                        onClick={() => handleStatusChange(item._id, "approved")}
                        className="bg-green-600 px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}

                    {item.status === "approved" && (
                      <button
                        onClick={() => handleStatusChange(item._id, "rejected")}
                        className="bg-red-600 px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <PageLeavePagination setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default LeaveList;
