import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaBuilding, FaLink } from "react-icons/fa";
import { API_URL } from "../../../src/config";
import { toast } from "react-toastify";

function AddEmpReference() {
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

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.position) {
      toast.error("Please fill all required fields");
      return;
    }
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (formData.phone.length < 10) {
      toast.error("Phone must be at least 10 digits");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (file) data.append("file", file);

      await axios.post(`${API_URL}/addref`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Employee reference added successfully!");
      setFormData({
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
      setFile(null);
    } catch (error) {
      console.error("Error submitting employee_ref:", error);
      toast.error("Failed to submit employee reference.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full bg-black text-white mx-auto rounded-xl shadow-lg min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 border-b pb-4 text-center sm:text-left">
        Employee Reference Zone
      </h1>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 bg-gradient-to-r from-neutral-900 to-blue-900 p-4 sm:p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} icon={<FaUser />} />

        {/* Email */}
        <InputField label="Email" name="email" value={formData.email} onChange={handleChange} icon={<FaEnvelope />} />

        {/* Phone */}
        <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} icon={<FaPhone />} />

        {/* Position */}
        <SelectField
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          icon={<FaIdCard />}
          options={["Developer", "Designer", "Manager"]}
        />

        {/* Company */}
        <InputField label="Company" name="company" value={formData.company} onChange={handleChange} icon={<FaBuilding />} />

        {/* Relationship */}
        <InputField label="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} />

        {/* Experience */}
        <InputField label="Experience (Years)" name="experience" value={formData.experience} onChange={handleChange} type="number" />

        {/* LinkedIn */}
        <InputField label="LinkedIn URL" name="linkedin" value={formData.linkedin} onChange={handleChange} icon={<FaLink />} />

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block mb-2  text-lg font-medium">Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional comments..."
            className="w-full px-3 border border-white  py-2 rounded-md text-black outline-none text-sm sm:text-base"
            rows="3"
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-lg font-medium">Upload Reference Letter:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400 
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Input Field
const InputField = ({ label, name, value, onChange, icon, type = "text" }) => (
  <div>
    <label className="block mb-2 text-lg font-medium">{label}:</label>
    <div className="flex items-center border rounded-md overflow-hidden bg-white">
      {icon && <div className="bg-black text-white p-2">{icon}</div>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="flex-1 px-3 py-2 outline-none text-sm sm:text-base text-black"
      />
    </div>
  </div>
);

// Select Field
const SelectField = ({ label, name, value, onChange, icon, options }) => (
  <div>
    <label className="block mb-2 text-lg font-medium">{label}:</label>
    <div className="flex items-center border rounded-md overflow-hidden bg-white">
      {icon && <div className="bg-black text-white p-2">{icon}</div>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-2 outline-none text-sm sm:text-base text-black"
      >
        <option value="">Choose {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default AddEmpReference;
