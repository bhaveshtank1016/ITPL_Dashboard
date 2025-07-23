import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const AddUserModal = ({ close, onUserAdded, onUserUpdated, existingUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    department: "",
    position: "",
    salary: "",
    role: "",
    complete: 0,
    profilePhoto: "",
    status: "Active", //set Default Active status
    joiningDate: new Date().toISOString().substr(0, 10),
  });
// Existing User Fill Karne ke liye 
  useEffect(() => {
    if (existingUser) {
      const [firstName, lastName = ""] = existingUser.name.split(" ");
      setForm({
        ...existingUser,
        firstName,
        lastName,
        password: "", // leave password blank on edit
      });
    }
  }, [existingUser]);

// input ke change pr value form object me update karta hai. 
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const token = localStorage.getItem("token"); // ✅ Move this up

    const url = existingUser
      ? `http://localhost:8001/api/user/update`
      : `http://localhost:8001/api/user/create`;
    const method = existingUser ? "PUT" : "POST";

    const payload = {
      ...form,
      name: fullName,
      complete: Number(form.complete) || 0,
    };

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ token now declared earlier
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      existingUser ? onUserUpdated(data) : onUserAdded(data);
      close();
      Swal.fire({
        icon: "success",
        title: existingUser ? "User Updated" : "User Created",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire("Error", data.message || "Something went wrong", "error");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          profilePhoto: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white/50 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl w-11/12 md:w-4/5 lg:w-3/5 max-h-[90vh] overflow-y-auto border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow">
          {existingUser ? "Edit User" : "Add New User"}
        </h2>
        {/* Profile Photo */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-white bg-gray-800 border border-gray-600 rounded cursor-pointer focus:outline-none"
          />
        </div>

        {form.profilePhoto && (
          <img
            src={form.profilePhoto}
            alt="Preview"
            className="w-16 h-16 mt-2 rounded-full object-cover"
          />
        )}

        {/* Name */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="border p-2 w-1/2 text-black"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="border p-2 w-1/2 text-black"
          />
        </div>

        {/* Email + Password */}
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={form.email}
            onChange={handleChange}
            className="border w-full mb-2 p-2 text-black"
          />
          {!existingUser && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                autoComplete="new-password"
                onChange={handleChange}
                className="border w-full mb-2 p-2 text-black pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}
        </div>

        {/* Phone + DOB */}
        <div className="mb-3">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border w-full mb-2 p-2 text-black"
          />
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="border p-2 w-full text-black"
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="block mb-1 text-sm">Gender</label>
          <div className="flex gap-4 text-black">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full mb-3 text-black"
        />

        {/* Department + Position */}
        <div className="mb-3">
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="border w-full mb-2 p-2 text-black"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={handleChange}
            className="border w-full p-2 text-black"
          />
        </div>

        {/* Salary + Role */}
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="border p-2 w-full mb-3 text-black"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 w-full mb-3 text-black"
        >
          <option value="">Select Role</option>
          <option value="6878b8c8a3c5b809cb6b919a">Admin</option>
          <option value="6878e57467972bbaadc73bf8">Employee</option>
        </select>

        {/* Completion */}
        <label className="text-sm">Profile Completion %</label>
        <input
          type="number"
          name="complete"
          value={form.complete}
          onChange={handleChange}
          className="border p-2 w-full mb-3 text-black"
        />

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full mb-3 text-black"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Joining Date */}
        <input
          type="date"
          name="joiningDate"
          value={form.joiningDate}
          onChange={handleChange}
          className="border p-2 w-full mb-3 text-black"
        />

        {/* Buttons submit or update cancel */}
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            {existingUser ? "Update" : "Add User"}
          </button>
          <button
            type="button"
            onClick={close}
            className="bg-gray-300 text-black px-4 py-2 rounded w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;
