import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import { API_URL } from "../../../src/config";
import { toast } from "react-toastify";

function AddEmpReference() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });
  // changes
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handlesubmit

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/addref`, formData);
      toast.success("employee reference updated successfully!");
      setFormData({ name: "", email: "", phone: "", position: "" }); 
    } catch (error) {
      console.log("Error submitting employee_ref:", error);
      toast.error("Failed to submit employee_ref.");
    }
  };

  return (
    <div className="p-10 h-screen sm:p-6 md:p-8 max-w-8xl bg-black text-white mx-auto rounded-xl shadow-lg">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 border-b pb-4">
        Employee Reference Zone
      </h1>
      <form  className="grid grid-cols-1 md:grid-cols-2  bg-gradient-to-r from-neutral-900  to-blue-900 p-10 rounded-md gap-8"
       onSubmit={handlesubmit}>
        <div>
          <label className="block mb-2 text-lg font-medium "> Name:</label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handlechange}
              placeholder="Name"
              className="flex-1 px-3 py-2 outline-none text-sm sm:text-base"
            />
            <div className="bg-black text-white p-2 rounded-l-md">
              <FaUser />
            </div>
          </div>
        </div>
        <div className="">
          <label className="block mb-2 text-lg font-medium "> Email:</label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handlechange}
              placeholder="Email"
              className="flex-1 px-3 py-2 outline-none text-sm sm:text-base"
            />
            <div className="bg-black text-white p-2 rounded-l-md">
              <FaEnvelope />
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium">Phone:</label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handlechange}
              placeholder="Phone"
              className="flex-1 px-3 py-2 outline-none text-sm sm:text-base"
            />
            <div className="bg-black text-white p-2 rounded-l-md">
              <FaPhone />
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium">Position:</label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <select
              name="position"
              value={formData.position}
              onChange={handlechange}
              className="flex-1 px-3 py-2 outline-none text-sm sm:text-base text-black"
            >
              <option value="">Choose Position</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
            <div className="bg-black text-white p-2">
              <FaIdCard />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmpReference;
