import React, { useEffect, useState } from "react";

const Profile_info = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    joiningDate: "",
    position: "",
    department: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:8001/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.user) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            gender: data.user.gender || "",
            dob: data.user.dob ? data.user.dob.slice(0, 10) : "",
            address: data.user.address || "",
            joiningDate: data.user.joiningDate ? data.user.joiningDate.slice(0, 10) : "",
            position: data.user.position || "",
            department: data.user.department || "",
            salary: data.user.salary || "",
          });
        } else {
          console.error("Failed to fetch profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8001/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update error:", err.message);
      alert("Server error");
    }
  };

  return (
    <div className="mx-auto container">
      <div className="bg-neutral-900 text-white w-full min-h-screen px-5 pt-5">
        <div className="w-full mx-auto bg-neutral-950 rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-6">Update Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_info;
