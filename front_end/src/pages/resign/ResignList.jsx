import { useEffect, useState } from "react";
import { FaInbox, FaPen } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import PagePagination from "./PagePagination";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";


function ResignList() {
  const [page, setPage] = useState(1);
  const [resign, setResign] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const userRole = user?.role?.name?.toLowerCase();
 
  const fetchResign = async () => {
    try {
      const res = await fetch(
        `${API_URL}/resign/list?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      setResign(data.list || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch resigns", error);
    }
  };

  useEffect(() => {
    fetchResign();
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
        fetchResign(); // refresh list
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
      <ToastContainer position="top-right" autoClose={2000} />{" "}
      {/* ✅ Toast Container */}
      <h2 className="text-xl mb-10 pb-3 rounded-md sm:text-2xl font-semibold">
        Resign Section
      </h2>
      {/* Top buttons */}
      <div className="flex justify-end">
        <button className="border mr-2 px-4 py-2 flex gap-3 items-center bg-blue-700 rounded-md">
          <FaInbox />
          Inbox
        </button>
        <button className="border mr-2 px-4 py-2 flex gap-3 items-center bg-blue-700 rounded-md">
          <LuSend />
          Sent
        </button>
        <button className="border px-4 py-2 flex gap-3 items-center bg-blue-700 rounded-md">
          <FaPen />
          Compose
        </button>
      </div>
      {/* Search */}
      <div className="flex justify-end mt-5">
        <label className="font-bold text-xl mr-3">Search </label>
        <input
          type="text"
          className="border h-10 rounded-md w-60 text-black px-2"
        />
      </div>
      {/* Table */}
      <div>
        <table className="table-auto mt-10 w-full border-collapse border border-gray-300">
          {/* Table Header */}
          <thead>
            <tr className="text-center border">
              <th className="border border-gray-700 text-lg px-4 py-2">No.</th>
              <th className="border border-gray-700 text-lg px-4 py-2">Name</th>
              <th className="border border-gray-700 text-lg px-4 py-2">Role</th>

              {/* ✅ Position column - only for Admin & HR */}
              {["admin", "hr"].includes(userRole) && (
                <th className="border border-gray-700 text-lg px-4 py-2">
                  Position
                </th>
              )}

              <th className="border border-gray-700 text-lg px-4 py-2">
                Subject
              </th>
              <th className="border border-gray-700 text-lg px-4 py-2">From</th>
              <th className="border border-gray-700 text-lg px-4 py-2">Date</th>
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

          {/* Table Body */}
          <tbody>
            {resign.map((item, index) => (
              <tr className="text-center border" key={item._id || index}>
                <td className="border border-gray-700 px-4 py-2">
                  {(page - 1) * 10 + index + 1}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {item.userId?.name || "-"}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {item.userId?.role?.name || "-"}
                </td>

                {/* ✅ Position data - only for Admin & HR */}
                {["admin", "hr"].includes(userRole) && (
                  <td className="border border-gray-700 px-4 py-2">
                    {item.userId?.position || "-"}
                  </td>
                )}

                <td className="border border-gray-700 px-4 py-2">
                  {item.subject}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {item.from}
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

                {/* Action buttons */}
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
        <PagePagination setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default ResignList;
