// src/dashboard/Dashboard.jsx
import React from "react";
import AdminDashboard from "./AdminDashboard";
import HrDashboard from "./HrDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import ManagerDashboard from "./ManagerDashboard";
import HRM from "../hr/hrm";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);
  const role = user?.role?.name;

  if (role === "admin") return <AdminDashboard />;
  if (role === "hr") return <HrDashboard />;
  if (role === "employee") return <EmployeeDashboard />;
  if (role === "manager") return <ManagerDashboard />;
  if (role === "hrm") return <HRM />;

  return <div>Access Denied</div>;
};


export default Dashboard;
