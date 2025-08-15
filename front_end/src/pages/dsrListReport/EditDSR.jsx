import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../src/config"; 


export default function EditDSR() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    email: "",
    date: "",
    attachment: "",
  });
  const [projects, setProjects] = useState([{ projectName: "", projectDescription: "", todoTask: "" }]);

  // Fetch the specific DSR
  useEffect(() => {
    if (!token) {
      toast.error("Authentication required");
      navigate("/login");
      return;
    }

    axios
      .get(`${API_URL}/dsr/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setForm({
          email: data.email || "",
          date: data.date || "",
          attachment: data.attachment || "",
        });
        setProjects(data.projects || [{ projectName: "", projectDescription: "", todoTask: "" }]);
      })
      .catch(() => toast.error("Failed to fetch DSR"));
  }, [id, token, navigate]);

  // Handle simple form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle project field change
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/update/${id}`,
        { ...form, projects },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("DSR updated successfully!");
      navigate("/dsr_list");
    } catch (err) {
      toast.error("Failed to update DSR");
    }
  };

  return (
    <div className="bg-neutral-950 text-white p-6">
      <h1 className="text-xl font-bold mb-4">Edit DSR</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email */}
        <div>
          <label>Email:</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="p-2 text-black w-full"
          />
        </div>

        {/* Date */}
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={form.date ? form.date.split("T")[0] : ""}
            onChange={handleChange}
            className="p-2 text-black w-full"
          />
        </div>

        {/* Attachment */}
        <div>
          <label>Attachment:</label>
          <input
            name="attachment"
            value={form.attachment}
            onChange={handleChange}
            className="p-2 text-black w-full"
          />
        </div>

        {/* Projects */}
        {projects.map((project, index) => (
          <div key={index} className="bg-neutral-800 p-3 rounded space-y-2">
            <input
              type="text"
              placeholder="Project Name"
              value={project.projectName}
              onChange={(e) => handleProjectChange(index, "projectName", e.target.value)}
              className="p-2 text-black w-full"
            />
            <input
              type="text"
              placeholder="Project Description"
              value={project.projectDescription}
              onChange={(e) => handleProjectChange(index, "projectDescription", e.target.value)}
              className="p-2 text-black w-full"
            />
            <input
              type="text"
              placeholder="Todo Task"
              value={project.todoTask}
              onChange={(e) => handleProjectChange(index, "todoTask", e.target.value)}
              className="p-2 text-black w-full"
            />
          </div>
        ))}

        {/* Submit */}
        <button type="submit" className="bg-blue-600 p-2 rounded text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
}

