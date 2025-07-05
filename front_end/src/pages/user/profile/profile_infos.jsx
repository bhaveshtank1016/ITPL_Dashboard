import React, { useState } from "react";
const Profile_info = () => {
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
    <div className=" mx-auto container ">
      <div className="bg-neutral-900 text-white w-full min-h-screen px-5 pt-5">
        <div className="w-full   mx-auto bg-neutral-950 rounded-xl p-8 ">
          <h2 className="text-xl font-semibold ">Profile Photo</h2>
          <div className="flex items-center gap-4 mb-8">
            <div className="relative w-20 h-20 rounded-full bg-neutral-700 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/8.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="bg-neutral-700 px-4 py-1 rounded">Remove</button>
          </div>

          {/* Full Name */}
          <div className="mb-4  ">
            <label className="block mb-1">Full Name</label>
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
            <label className="block mb-1">Date of Birth </label>
            20
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
            <label className="block mb-1">Email</label>

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
            <label className="block mb-1">Phone Number </label>

            <div className="flex gap-4">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9874562138"
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
              <input
                name="phoneType"
                value={formData.phoneType}
                onChange={handleChange}
                placeholder="Office"
                className="bg-neutral-800 p-2 rounded-md px-3"
              />
            </div>
          </div>

          {/* Department */}
          <div className="mb-6">
            <label className="block mb-1">Department</label>

            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="CRM Management"
              className="w-full bg-neutral-800 p-2 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_info;
