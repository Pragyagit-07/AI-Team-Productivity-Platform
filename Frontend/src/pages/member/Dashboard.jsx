


import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function MemberDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const links = [
    {name: "Home", path: "/dashboard"},
    { name: "Projects", path: "/dashboard/projects" },
    { name: "Tasks", path: "/dashboard/tasks" },
    { name: "Calender", path: "/dashboard/calender"},
    { name: "Activity", path: "/dashboard/activity" },
    { name: "Subscriptions", path: "/dashboard/subscriptions" },
    { name: "AI Assistant", path: "/dashboard/ai" },
    { name: "Profile Setting", path: "/dashboard/profile" },
  ];

  const handleLogout = () => {
    
    localStorage.removeItem("memberToken");
    localStorage.removeItem("memberId");
window.location.href = "/login";

  };

  return (
    <div className="flex h-screen overflow-hidden">
      
      <Sidebar
        links={links}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        className="flex-1 flex flex-col"
        onClick={() => setSidebarOpen(false)}
        onDoubleClick={() => setSidebarOpen(true)}
      >
        <Header
          username="Member"
          onLogout={handleLogout}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


