// src/dashboard/Dashboard.jsx
import React from "react";
import AdminDashboard from "./AdminDashboard";
import HrDashboard from "./HrDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);
  const role = user?.role?.name;

  if (role === "admin") return <AdminDashboard />;
  if (role === "hr") return <HrDashboard />;
  if (role === "employee") return <EmployeeDashboard />;

  return <div>Access Denied</div>;
};


export default Dashboard;
