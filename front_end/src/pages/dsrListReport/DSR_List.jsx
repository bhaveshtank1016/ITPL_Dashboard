import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { API_URL } from "../../../src/config"; 

export default function DSRList() {
  const [dsrs, setDsrs] = useState([]);
  const [user, setUser] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const dsrsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndDSRs = async () => {
      try {
        const token = localStorage.getItem("token");
        const userDataStr = localStorage.getItem("user"); 

        if (!userDataStr) {
          toast.error("User info not found. Please log in.");
          return;
        }

        const userData = JSON.parse(userDataStr); 
        setUser(userData);

        if (!token) {
          toast.error("Token not found. Please log in.");
          return;
        }

        const res = await axios.get(`${API_URL}/dsr/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDsrs(res.data);
      } catch (err) {
        console.error("Error fetching DSRs:", err);
        toast.error("Failed to fetch DSRs");
      }
    };

    fetchUserAndDSRs();
  }, []);

  if (!user) return <p className="text-center text-gray-300">Loading...</p>; 

  const isEmployee = user.role && user.role.name === "employee";
  const isAdmin = user.role && user.role.name === "admin";
  const isHR = user.role && user.role.name === "hr";

  // ✅ Filter + Pagination
  const filteredDsrs = dsrs.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.email?.toLowerCase().includes(search) ||
      item.userId?.name?.toLowerCase().includes(search) ||
      item.projects?.some(
        (p) =>
          p.projectName?.toLowerCase().includes(search) ||
          p.projectDescription?.toLowerCase().includes(search) ||
          p.todoTask?.toLowerCase().includes(search)
      )
    );
  });

  const indexOfLastDSR = currentPage * dsrsPerPage;
  const indexOfFirstDSR = indexOfLastDSR - dsrsPerPage;
  const currentDsrs = filteredDsrs.slice(indexOfFirstDSR, indexOfLastDSR);
  const totalPages = Math.ceil(filteredDsrs.length / dsrsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen rounded-2xl bg-[#d9e0e8] text-gray-800 dark:bg-neutral-900 dark:text-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold  mb-4 md:mb-0">
        DSR LIST
        </h1>

        {(isEmployee || isHR) && (
          <button
            onClick={() => navigate("/dsr/add")}
            className="bg-blue-800 hover:scale-105 transform transition-all duration-300 shadow-lg text-white font-semibold py-2 px-5 rounded-2xl"
          >
            + Add DSR
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Name, Email, Project..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-3 rounded-xl bg-neutral-800/70 backdrop-blur-md text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Table / Card */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="hidden md:table min-w-full  rounded-xl overflow-hidden">
          <thead className="bg-neutral-800/80 uppercase text-gray-300">
            <tr className="text-center text-sm font-semibold">
              <th className="p-3">No.</th>
              <th className="p-3">Date</th>
              <th className="p-3">Email</th>
              <th className="p-3">Name</th>
              <th className="p-3">Attachment</th>
              <th className="p-3">To Do Tasks</th>
              {isHR && <th className="p-3">Action</th>}
            </tr>
          </thead>
          <tbody>
            {currentDsrs.length > 0 ? (
              currentDsrs.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-t border-neutral-700 text-center hover:bg-neutral-800/70 transition"
                >
                  <td className="p-3">{indexOfFirstDSR + index + 1}</td>
                  <td className="p-3">{new Date(item.date).toLocaleString()}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.userId?.name || "No name"}</td>
                  <td className="p-3">{item.attachment || "No attachment"}</td>
                  <td className="p-3 text-left">
                    {item.projects?.length > 0 ? (
                      item.projects.map((p, i) => (
                        <div key={i} className=" p-2 text-center rounded mb-1">
                          <p><strong>Name:</strong> {p.projectName}</p>
                          <p><strong>Description:</strong> {p.projectDescription}</p>
                          <p><strong>To Do Task:</strong> {p.todoTask}</p>
                        </div>
                      ))
                    ) : (
                      <span>No projects</span>
                    )}
                  </td>
                  {isHR && (
                    <td className="p-3">
                      <button
                        onClick={() => navigate(`/dsr/edit/${item._id}`)}
                        className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem("token");
                            await axios.delete(`${API_URL}/dsr/delete/${item._id}`, {
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            setDsrs(prev => prev.filter(d => d._id !== item._id));
                            toast.success("DSR deleted!");
                          } catch {
                            toast.error("Delete failed");
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isHR ? 7 : 6} className="py-6 text-center text-gray-400">
                  No DSRs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 📱 Mobile Card View */}
        <div className="grid md:hidden gap-4">
          {currentDsrs.length > 0 ? (
            currentDsrs.map((item, index) => (
              <div
                key={item._id}
                className="bg-neutral-900/70 p-4 rounded-xl shadow-md border border-neutral-700"
              >
                <p className="text-sm text-gray-400">#{indexOfFirstDSR + index + 1}</p>
                <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Name:</strong> {item.userId?.name || "No name"}</p>
                <p><strong>Attachment:</strong> {item.attachment || "No attachment"}</p>
                <div className="mt-2">
                  {item.projects?.length > 0 &&
                    item.projects.map((p, i) => (
                      <div key={i} className="bg-neutral-800 p-2 rounded mb-1">
                        <p><strong>Name:</strong> {p.projectName}</p>
                        <p><strong>Description:</strong> {p.projectDescription}</p>
                        <p><strong>Task:</strong> {p.todoTask}</p>
                      </div>
                    ))}
                </div>
                {isHR && (
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => navigate(`/dsr/edit/${item._id}`)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem("token");
                          await axios.delete(`${API_URL}/dsr/delete/${item._id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          setDsrs(prev => prev.filter(d => d._id !== item._id));
                          toast.success("DSR deleted!");
                        } catch {
                          toast.error("Delete failed");
                        }
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
                    >
                      <MdDelete />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No DSRs found.</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2  rounded-lg  disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                  : "bg-neutral-800 hover:bg-neutral-700 text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2  rounded-lg  disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
