import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {API_URL} from "../../../src/config"

const AddUserForm = ({ onUserAdded, onUserUpdated }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // for edit mode
  const [showPassword, setShowPassword] = useState(false);
  const [existingUser, setExistingUser] = useState(null);
  const [roles, setRoles] = useState([]); //for feching roles

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
    status: "Active",
    joiningDate: new Date().toISOString().substr(0, 10),
  });

  // fetching existing roles
  useEffect(() => {
    fetch(`${API_URL}/rolesList`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch roles: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Roles response:", data); // 👈 THIS IS IMPORTANT
        const roleArray = Array.isArray(data) ? data : data.roles;
        setRoles(Array.isArray(roleArray) ? roleArray : []);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        setRoles([]); // fallback to empty array
      });
  }, []);

  // Fetch existing user data if editing
  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const [firstName, lastName = ""] = data.name.split(" ");
          setExistingUser(data);
          setForm({
            ...data,
            firstName,
            lastName,
            password: "",
          });
        });
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          profilePhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onUserSaved = existingUser ? onUserUpdated : onUserAdded;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = `${form.firstName} ${form.lastName}`.trim();

    const url = existingUser
      ? `${API_URL}/user/update`
      : `${API_URL}/user/create`;
    const method = existingUser ? "PUT" : "POST";

    const payload = {
      ...form,
      name: fullName,
      complete: Number(form.complete) || 0,
    };

    if (existingUser) {
      payload.id = id;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: existingUser ? "User Updated" : "User Created",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          onUserSaved?.(data);
          navigate("/users");
        }, 1500);
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="p-4 md:p-6 w-full min-h-screen rounded-2xl bg-[#d9e0e8] text-gray-800 dark:bg-neutral-900 dark:text-white text-white flex items-center justify-center overflow-auto">
      <form
        onSubmit={handleSubmit}
        className=" bg-neutral-950 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl w-full  border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow">
          {existingUser ? "Update User" : "Add New User"}
        </h2>

        {/* Profile Image */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm  bg-neutral-800  h-10  rounded-md cursor-pointer"
          />
          {form.profilePhoto && (
            <img
              src={form.profilePhoto}
              alt="Preview"
              className="w-16 h-16 mt-2 rounded-full object-cover"
            />
          )}
        </div>

        {/* First + Last Name */}
        <div className="flex gap-2 mb-3">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">
              First Name<span className="text-red-600 text-lg">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="p-2 w-full rounded-md bg-neutral-800"
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">
              Last Name<span className="text-red-600 text-lg">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="p-2 w-full rounded-md bg-neutral-800"
            />
          </div>
        </div>

        {/* Email + Password */}
        <label className="block mb-1 text-sm font-medium">
          Email <span className="text-red-600 text-lg">*</span>
        </label>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className=" w-full mb-2 p-2 bg-neutral-800"
          />
          <label className="block mb-1 text-sm font-medium">
            Password<span className="text-red-600 text-lg">*</span>
          </label>
          {!existingUser && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="rounded-md w-full mb-2 p-2 bg-neutral-800 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}
        </div>

        {/* Phone + DOB */}

        <div className="flex gap-2 mb-3">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">
              Phone<span className="text-red-600 text-lg">*</span>
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className=" p-2 w-full rounded-md bg-neutral-800 "
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">
              DOB<span className="text-red-600 text-lg">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className=" p-2 w-full rounded-md bg-neutral-800 "
            />
          </div>
        </div>

        {/* Gender */}

        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">
            Gender<span className="text-red-600 text-lg">*</span>{" "}
          </label>
          <div className="flex gap-15 pl-5 rounded-md bg-neutral-800 h-10 items-center ">
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
        <label className="block mb-1 text-sm font-medium">
          Address<span className="text-red-600 text-lg">*</span>
        </label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="rounded-md p-2 w-full mb-3 bg-neutral-800"
        />

        {/* Department + Position */}

        <div className="flex gap-2 mb-3">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">
              Department<span className="text-red-600 text-lg">*</span>
            </label>
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              className=" p-2 w-full rounded-md bg-neutral-800 "
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">
              Position<span className="text-red-600 text-lg">*</span>
            </label>
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={form.position}
              onChange={handleChange}
              className=" p-2 w-full rounded-md bg-neutral-800 "
            />
          </div>
        </div>

        {/* Salary + Role */}
        <div>
          <div className="flex gap-2 mb-3">
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium">
                Salary<span className="text-red-600 text-lg">*</span>
              </label>
              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={form.salary}
                onChange={handleChange}
                className=" p-2 w-full mb-3 rounded-md bg-neutral-800 "
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium">
                Role<span className="text-red-600 text-lg">*</span>
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="p-2 w-full mb-3 rounded-md bg-neutral-800"
              >
                <option value="">Select Role</option>
                {Array.isArray(roles) &&
                  roles
                    .filter((role) => role.name.toLowerCase() !== "admin") // 👈 Remove "Admin"
                    .map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </div>

        {/* Status */}
        <label className="block mb-1 text-sm font-medium">
          status<span className="text-red-600 text-lg">*</span>
        </label>
        <div className="flex gap-2 mb-3">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className=" p-2 w-full mb-3 rounded-md bg-neutral-800 "
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            {existingUser ? "Update" : "Add User"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="bg-blue-900 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
