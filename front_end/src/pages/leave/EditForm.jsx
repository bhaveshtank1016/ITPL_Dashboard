// EditForm.jsx
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditForm({ formData, setFormData, editId, setEditId, setLeave }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:8001/api/leave/${editId}`, formData);
      const updated = res.data;
      setLeave((prev) =>
        prev.map((item) => (item._id === editId ? updated : item))
      );
      toast.success("Leave updated");
      setEditId(null);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update");
    }
  };

  return (
    <div className="bg-gray-800 p-4 mt-6 rounded">
      <h3 className="text-lg mb-3 font-semibold">Edit Leave Entry</h3>
      <div className="flex flex-col gap-2 mb-3">
        <input name="from" placeholder="From" value={formData.from} onChange={handleChange} className="p-2 rounded text-black" />
        <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="p-2 rounded text-black" />
        <input name="date" placeholder="Date" value={formData.date} onChange={handleChange} className="p-2 rounded text-black" />
        <input name="message" placeholder="Message" value={formData.message} onChange={handleChange} className="p-2 rounded text-black" />
      </div>
      <button onClick={handleUpdate} className="bg-green-600 px-4 py-2 text-white rounded mr-2">Update</button>
      <button onClick={() => setEditId(null)} className="underline text-gray-300">Cancel</button>
    </div>
  );
}

export default EditForm;
