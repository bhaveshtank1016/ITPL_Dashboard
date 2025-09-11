import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddUserModal from "./AddUserForm";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../src/config";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // ✅ Filtered list
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search input
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data); // ✅ initialize
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Filter users on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(lowerSearch) ||
          user.email?.toLowerCase().includes(lowerSearch) ||
          user.position?.toLowerCase().includes(lowerSearch) ||
          user.department?.toLowerCase().includes(lowerSearch) ||
          user.role?.name?.toLowerCase().includes(lowerSearch)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        fetchUsers();
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } else {
        Swal.fire("Error", data.message || "Failed to delete", "error");
      }
    }
  };

  return (
    <div className="bg-[#d9e0e8] text-gray-800 min-h-screen dark:bg-neutral-900 dark:text-white p-6 rounded-xl">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold">Users</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-400 dark:bg-neutral-500 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          <button
            onClick={() => navigate("/add-user")}
            className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-800 transition"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden rounded-2xl md:block overflow-x-auto">
        <table className="w-full   bg-gray-100/90 dark:bg-neutral-900  ">
          <thead className="bg-neutral-800/80   uppercase  text-gray-300">
            <tr className="text-left text-sm   font-semibold">
              <th className="p-3">Name</th>
              <th className="p-3">Position</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Joined Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-700 hover:bg-neutral-800/70 transition"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          user.profilePhoto?.trim()
                            ? user.profilePhoto
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{user.name || "No Name"}</p>
                        <p className="text-sm text-gray-400">
                          {user.email || "No Email"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <p>{user.position || "N/A"}</p>
                    <p className="text-gray-400 text-sm">
                      {user.department || "N/A"}
                    </p>
                  </td>
                  <td className="p-3">
                    <span className="uppercase px-2 py-1 rounded">
                      {user.role?.name || "N/A"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-sm font-medium ${
                        user.status === "Active"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {user.status || "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    {user.joiningDate
                      ? new Date(user.joiningDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => navigate(`/add-user/${user._id}`)}
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      <RiEdit2Line size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-400 underline"
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-neutral-900/70 rounded-xl p-4 shadow-md border border-neutral-800"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    user.profilePhoto?.trim()
                      ? user.profilePhoto
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user.name || "No Name"}</p>
                  <p className="text-sm text-gray-400">
                    {user.email || "No Email"}
                  </p>
                </div>
              </div>

              <p className="text-sm">
                <span className="font-medium">Position:</span>{" "}
                {user.position || "N/A"} ({user.department || "N/A"})
              </p>
              <p className="text-sm">
                <span className="font-medium">Role:</span>{" "}
                {user.role?.name || "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    user.status === "Active" ? "text-green-400" : "text-red-400"
                  }
                >
                  {user.status || "Inactive"}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Joined:</span>{" "}
                {user.joiningDate
                  ? new Date(user.joiningDate).toLocaleDateString()
                  : "N/A"}
              </p>

              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => navigate(`/add-user/${user._id}`)}
                  className="text-yellow-400 hover:text-yellow-300 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 hover:text-red-400 underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No users found</p>
        )}
      </div>

      {showModal && (
        <AddUserModal
          close={() => {
            setShowModal(false);
            setEditUser(null);
          }}
          onUserAdded={fetchUsers}
          onUserUpdated={fetchUsers}
          existingUser={editUser}
        />
      )}
    </div>
  );
};

export default UserPage;
