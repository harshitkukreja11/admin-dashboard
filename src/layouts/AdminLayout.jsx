import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main content */}
      <div className="flex-fill">
        <AppNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
