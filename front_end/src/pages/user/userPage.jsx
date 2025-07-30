import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddUserModal from "./AddUserForm";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8001/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

      const res = await fetch(`http://localhost:8001/api/user/delete/${id}`, {
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
    <div className="bg-black min-h-screen text-white p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
       

        <button
          onClick={() => navigate("/add-user")}
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
        >
          + Add User
        </button>
      </div>

      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-400">
            <th>Name</th>
            <th>Position</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t border-gray-700">
              <td>
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
              <td>
                <p>{user.position || "N/A"}</p>
                <p className="text-gray-400 text-sm">
                  {user.department || "N/A"}
                </p>
              </td>
              <td>
                <span className="bg-gray-800 px-2 py-1 rounded">
                  {user.role?.name || "N/A"}
                </span>
              </td>
              <td>
                <span
                  className={`text-sm font-medium ${
                    user.status === "Active" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {user.status || "Inactive"}
                </span>
              </td>
              <td>
                {user.joiningDate
                  ? new Date(user.joiningDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setEditUser(user);
                    setShowModal(true);
                  }}
                  className="text-yellow-400 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
