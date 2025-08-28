import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../src/config";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditEmpReference() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    company: "",
    relationship: "",
    experience: "",
    linkedin: "",
    notes: "",
  });

  // Fetch single reference
useEffect(() => {
  const token = localStorage.getItem("token");
  axios
    .get(`${API_URL}/ref/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setFormData(res.data);
    })
    .catch((err) => {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Error fetching reference data!"
      );
    });
}, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    await axios.put(`${API_URL}/ref/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Reference updated successfully!");
    navigate("/empReferenceListing");
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Error updating reference!");
  }
};

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Edit Reference</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 w-full"
          required
        />
        <input
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <input
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full"
          required
        />
        <input
          name="position"
          value={formData.position || ""}
          onChange={handleChange}
          placeholder="Position"
          className="border p-2 w-full"
          required
        />
        <input
          name="company"
          value={formData.company || ""}
          onChange={handleChange}
          placeholder="Company"
          className="border p-2 w-full"
        />
        <input
          name="relationship"
          value={formData.relationship || ""}
          onChange={handleChange}
          placeholder="Relationship"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="experience"
          value={formData.experience || ""}
          onChange={handleChange}
          placeholder="Experience (yrs)"
          className="border p-2 w-full"
        />
        <input
          name="linkedin"
          value={formData.linkedin || ""}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="border p-2 w-full"
        />
        <textarea
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          placeholder="Notes"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditEmpReference;
