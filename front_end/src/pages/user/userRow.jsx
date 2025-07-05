import React from "react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const UserRow = ({ user }) => {
  return (
    // border inside users
    <tr className="border-b border-dashed neutral-700 rounded-md hover:bg-neutral-800 transition">
      <td className="p-3 flex items-center gap-3">
        <input type="checkbox" />
        <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
        <div>
          <div className="font-semibold text-white">{user.name}</div>
          <div className="text-sm text-neutral-400 pr-5 ">{user.email}</div>
        </div>
      </td>
      <td className="p-3 text-white">
        <div>{user.position}</div>
        <div className="text-sm text-neutral-400">{user.department}</div>
      </td>
      <td className="p-3 text-white">
        <div className="w-24 h-1 bg-neutral-700 rounded">
          <div
            className="h-1 bg-blue-500 rounded"
            style={{ width: `${user.profileCompletion}%` }}
          />
        </div>
        <div className="text-sm text-neutral-400">
          {user.profileCompletion}%
        </div>
      </td>
      <td className="p-3">
        <span
          className={`text-sm font-medium ${
            user.status === "Active" ? "text-green-400" : "text-red-400"
          }`}
        >
          {user.status === "Active" ? (
            <CheckCircleIcon className="inline w-4 h-4 mr-1" />
          ) : (
            <XCircleIcon className="inline w-4 h-4 mr-1" />
          )}
          {user.status}
        </span>
      </td>
      <td className="p-3 text-white">{user.joined}</td>
      <td className="p-3 text-right">
        <button className="text-neutral-400 hover:text-white">
          <FontAwesomeIcon icon={faEllipsisV} className="text-base" />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
