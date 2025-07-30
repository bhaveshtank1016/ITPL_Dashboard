import React from "react";
import AddUserForm from "./AddUserForm";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New User</h2>
      <AddUserForm
        onUserSaved={() => {
          navigate("/users");
        }}
        mode="create"
      />
    </div>
  );
};

export default AddUserPage;
