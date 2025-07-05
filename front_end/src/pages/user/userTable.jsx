// components/UserTable.jsx
import React from "react";
import UserRow from "./userRow";

const UserTable = ({ users }) => {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl shadow-md text-sm overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-neutral-400 border-b border-neutral-700">
            <th className="p-3">Name</th>
            <th className="p-3">Position</th>
            <th className="p-3">Profile Completeness</th>
            <th className="p-3">Status</th>
            <th className="p-3">Joined Date</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.email} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
