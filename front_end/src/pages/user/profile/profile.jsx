import React, { useState } from "react";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    phoneType: "Office",
    department: "Support Team",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className=" mx-auto container  ">
    <div className="bg-neutral-900 rounded-md lg:p-10  text-white w-full min-h-screen px-5 pt-5">
      <div className="w-full   mx-auto bg-neutral-950 rounded-xl p-8 ">
        <h2 className="text-xl font-semibold ">Profile Photo</h2>
        <p className="mb-6 text-xs text-slate-700">Upload a clear and recent profile photo</p>
       <div className="flex items-center gap-4 mb-8">
  <div className="relative w-20 h-20 rounded-full bg-neutral-700 overflow-hidden">
    <img
      src="https://randomuser.me/api/portraits/men/23.jpg" 
      alt="Profile"
      className="w-full h-full object-cover"
    />
    
    
  </div>
  <button className="bg-neutral-700 px-4 py-1 rounded">Remove</button>
</div>

        {/* Full Name */}
        <div className="mb-4  ">
          <label className="block mb-1">Full Name <span className="text-red-500">*</span>
          <p className="text-xs pb-4 text-slate-700">Enter your full legal name as it appears on your official identification.</p></label>
          <div className="flex gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="First Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-1/2 bg-neutral-800 p-2 rounded-md"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 bg-neutral-800 p-2 rounded-md"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block mb-1">Date of Birth <span className="text-red-500">*</span></label>
          <p className="text-xs text-slate-700 pb-4">This information is required to verify your age and provide age-appropriate services</p>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full bg-neutral-800 p-2 rounded-md"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block mb-1">Gender</label>
          <div className="flex gap-6">
            {["Male", "Female"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email <span className="text-red-500">*</span>
          </label>
            <p className="text-xs pb-4 text-slate-700">Please provide a valid email address that you have access to.</p>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="innovate@gmail.com"
            className="w-full bg-neutral-800 p-2 rounded-md"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block mb-1">Phone Number <span className="text-red-500">*</span></label>
          <p className="text-xs pb-4 text-slate-700">Please provide a valid phone number where we can reach you if needed.</p>
          <div className="flex gap-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9874562138"
              className="w-full bg-neutral-800 p-2 rounded-md"
            />
            <select
              name="phoneType"
              value={formData.phoneType}
              onChange={handleChange}
              className="bg-neutral-800 p-2 rounded-md px-3"
            >
              <option value="Office">Office</option>
              <option value="Home">Home</option>
            </select>
          </div>
          <button className="text-sm mt-2 underline text-blue-400">+ Add phone</button>
        </div>

        {/* Department */}
        <div className="mb-6">
          <label className="block mb-1">Department</label>
          <p className="text-xs text-slate-700 pb-4">Choose your department or division from the list of available options.</p>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full bg-neutral-800 p-2 rounded-md"
          >
            <option value="Support Team">Support Team</option>
            <option value="Engineering">Engineering</option>
            <option value="CRM Team">CRM Team</option>
            <option value="Project Management">Project Management</option>

          </select>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
          Submit
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProfileForm;
