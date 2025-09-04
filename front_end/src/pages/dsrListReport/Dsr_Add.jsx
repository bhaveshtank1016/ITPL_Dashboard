import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { API_URL } from "../../../src/config";

export default function AddDSRForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [managers, setManagers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    attachment: "",
  });

  const [projects, setProjects] = useState([
    { projectName: "", projectDescription: "", todoTask: "" },
  ]);

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { projectName: "", projectDescription: "", todoTask: "" },
    ]);
  };

  const handleRemoveProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Authentication required. Please log in again.");
      navigate("/login");
      return;
    }

    const payload = {
      ...form,
      userId,
      projects,
    };

    try {
      if (isEdit) {
        await axios.put(`${API_URL}/dsr/update/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("DSR updated successfully!");
      } else {
        await axios.post(`${API_URL}/dsr/create`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("DSR submitted successfully!");
      }

      navigate("/dsr_list");
    } catch (error) {
      console.error(
        "Submission failed:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
        navigate("/login");
      } else {
        toast.error("Failed to submit DSR");
      }
    }
  };

  // Fetch existing DSR when editing
  useEffect(() => {
    if (isEdit) {
      const token = localStorage.getItem("token");

      axios
        .get(`${API_URL}/dsr/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const existing = res.data;
          setForm({
            email: existing.email || "",
            date: existing.date ? existing.date.split("T")[0] : today,
            attachment: existing.attachment || "",
          });
          setProjects(
            existing.projects || [
              { projectName: "", projectDescription: "", todoTask: "" },
            ]
          );
        })
        .catch(() => toast.error("Failed to fetch DSR"));
    }
  }, [id]);

  // Fetch managers
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/user/managers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setManagers(res.data))
        .catch((err) => console.error("Failed to fetch managers:", err));
    }
  }, []);

  return (
    <div className="min-h-screen text-white bg-black px-7 rounded-md py-10">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-10">
        Employee DSR Section / <span className="text-gray-200">Overview</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-neutral-900 to-blue-900 rounded-lg p-10 space-y-6 w-full mx-auto"
      >
        {/* Email  */}
        
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Manager Name
            </label>
            <select
              className="w-full h-12 px-4 py-2 rounded-md border-white bg-neutral-800 text-white border"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager._id} value={manager.email}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
      

        {/* Attachment */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Attachment <span className="text-gray-400 text-sm">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="(optional)"
            className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
            value={form.attachment}
            onChange={(e) => setForm({ ...form, attachment: e.target.value })}
          />
        </div>

        {/* Projects */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative bg-neutral-950 p-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <label className="block mb-3 text-sm font-semibold">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="Project Name"
                  className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
                  value={project.projectName}
                  onChange={(e) =>
                    handleProjectChange(index, "projectName", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-3 text-sm font-semibold">
                  Project Description
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
                  value={project.projectDescription}
                  onChange={(e) =>
                    handleProjectChange(
                      index,
                      "projectDescription",
                      e.target.value
                    )
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-3 text-sm font-semibold">
                  Todo Task
                </label>
                <input
                  type="text"
                  placeholder="To Do Task"
                  className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
                  value={project.todoTask}
                  onChange={(e) =>
                    handleProjectChange(index, "todoTask", e.target.value)
                  }
                />
              </div>

              <div className="absolute top-2 right-2 flex space-x-2">
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove Project"
                  >
                    <FaTrash size={15} />
                  </button>
                )}
                {index === projects.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="text-green-500 hover:text-green-700"
                    title="Add Project"
                  >
                    <FaPlusCircle size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end-safe">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
          >
            {isEdit ? "Update DSR" : "Submit DSR"}
          </button>
        </div>
      </form>
    </div>
  );
}
