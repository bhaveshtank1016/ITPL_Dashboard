// components/Layout.jsx
import React from "react";
import Sidebar from "../layout/sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full p-4">
        { <Header />       /*Breadcrumb bar */}
        {children}       {/* Current route content */}
      </main>
    </div>
  );
};

export default Layout;
