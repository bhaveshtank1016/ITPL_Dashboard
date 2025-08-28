import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../src/config";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function EmpReferenceList() {
  const [refs, setRefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all references
  const fetchReferences = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/ref/show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefs(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching references!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  // Delete reference
  const handleDelete = async (id) => {
    try {
       const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/ref/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Reference deleted successfully!");
      setRefs(refs.filter((ref) => ref._id !== id));
    } catch {
      toast.error("Error deleting reference!");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 w-full min-h-screen">
     <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">
          Employee References
        </h1>
        <button
          onClick={() => navigate("/addEmpReference")}   // <-- Navigate to Add Form Page
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          + Add Reference
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : refs.length === 0 ? (
        <p className="text-gray-500">No references found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-xl overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-blue-700 to-teal-600 text-center text-white">
                <th className="p-3">Sr no.</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Position</th>
                <th className="p-3">Company</th>
                <th className="p-3">Relationship</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {refs.map((ref, index) => (
                <tr
                  key={ref._id}
                  className="border-b text-center border-gray-200 hover:bg-blue-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium text-gray-800">{ref.name}</td>
                  <td className="p-3 text-gray-600">{ref.phone}</td>
                  <td className="p-3">{ref.position}</td>
                  <td className="p-3">{ref.company}</td>
                  <td className="p-3">{ref.relationship}</td>
                  <td className="p-3">{ref.experience} yrs</td>
                  <td className="flex justify-center gap-2">
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(ref._id)}
                    >
                      <MdDelete size={20} />
                    </button>
                    <button
                      className="text-blue-500 cursor-pointer"
                      onClick={() => navigate(`/edit/ref/${ref._id}`)}
                    >
                      <MdEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmpReferenceList;
