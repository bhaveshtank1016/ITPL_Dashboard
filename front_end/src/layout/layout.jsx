// components/Layout.jsx
import React from "react";
import Sidebar from "../layout/sidebar";
import Search from "../components/search";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full p-4">
        { <Search />       /*Breadcrumb bar */}
        {children}       {/* Current route content */}
      </main>
    </div>
  );
};

export default Layout;
