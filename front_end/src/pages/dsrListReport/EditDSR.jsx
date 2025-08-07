import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditDSR() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    date: "",
    attachment: "",
    projects: [],
    todoTasks: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/dsr`)
      .then((res) => {
        const dsrToEdit = res.data.find((d) => d._id === id);
        if (dsrToEdit) setForm(dsrToEdit);
        else toast.error("DSR not found");
      })
      .catch((err) => toast.error("Failed to fetch DSR"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8001/api/dsr/${id}`, form);
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
        <div>
          <label>Email:</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="p-2 text-black w-full"
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={form.date.split("T")[0]}
            onChange={handleChange}
            className="p-2 text-black w-full"
          />
        </div>
        <div>
          <label>Attachment:</label>
          <input
            name="attachment"
            value={form.attachment}
            onChange={handleChange}
            className="p-2 text-black w-full"
          />
        </div>
        {/* You can add more fields for projects and todoTasks as needed */}
        <button type="submit" className="bg-blue-600 p-2 rounded text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
}


