import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { API_URL } from "../../../src/config"; 

export default function DSRList() {
  const [dsrs, setDsrs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDSRs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("No token found. Please log in.");
          return;
        }

        // Fetch DSRs with token
        const res = await axios.get(`${API_URL}/dsr`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched DSRs:", res.data);
        setDsrs(res.data);
      } catch (err) {
        console.error("Error fetching DSRs:", err);
        toast.error("Failed to fetch DSRs");
      }
    };

    fetchDSRs();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/dsr/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDsrs((prev) => prev.filter((item) => item._id !== id));
      toast.success("DSR deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete DSR");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 rounded-xl text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">DSR LIST</h1>
        <button
          onClick={() => navigate("/dsr/add")}
          className="bg-blue-600 hover:bg-blue-700 mb-5 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-4 rounded"
        >
          + Add DSR
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div className="mb-5">
          <label className="text-lg font-bold mr-2">Select Date</label>
          <input type="date" className="border p-1 rounded" />
        </div>
        <div className="ml-auto">
          <label className="text-md font-medium mr-2">Search:</label>
          <input
            type="text"
            placeholder="Search..."
            className="border p-1 rounded mb-5 lg:md:mb-0"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border rounded-md text-white">
        <table className="min-w-full shadow rounded-lg">
          <thead className="bg-neutral-800">
            <tr className="text-center text-sm font-semibold">
              <th className="p-3">No.</th>
              <th className="p-3">Date</th>
              <th className="p-3">Email</th>
              <th className="p-3">Name</th>
              <th className="p-3">Attachment</th>
              <th className="p-3">To Do Tasks</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-md bg-neutral-800 text-center">
            {dsrs.map((item, index) => (
              <tr key={item._id} className="border-t bg-neutral-800">
                <td>{index + 1}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.email}</td>
                <td>{item.userId?.name || "No name"}</td>
                <td>{item.attachment || "No attachment"}</td>
                <td>
                  <div className="flex flex-col items-start gap-2 px-2">
                    {item.projects && item.projects.length > 0 ? (
                      item.projects.map((project, pIndex) => (
                        <div
                          key={pIndex}
                          className="bg-neutral-900 text-left p-2 rounded w-full"
                        >
                          <p>
                            <strong>Name:</strong> {project.projectName}
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {project.projectDescription}
                          </p>
                          <p>
                            <strong>To Do Task:</strong> {project.todoTask}
                          </p>
                        </div>
                      ))
                    ) : (
                      <span>No projects available</span>
                    )}

                    {item.todoTasks && item.todoTasks.length > 0 && (
                      <div className="mt-2 w-full bg-neutral-900 text-left p-2 rounded">
                        <p className="font-semibold">Other Tasks:</p>
                        <ul className="list-disc list-inside">
                          {item.todoTasks.map((task, tIndex) => (
                            <li key={tIndex}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-2 rounded mr-2"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => navigate(`/dsr/edit/${item._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
