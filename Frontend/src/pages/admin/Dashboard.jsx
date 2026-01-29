import { Outlet } from "react-router-dom";
import { useState, } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Organizations", path: "/admin/dashboard/organizations" },
  { name: "Branches", path: "/admin/dashboard/branches" },
  { name: "Org Users", path: "/admin/dashboard/org-users" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    window.location.href = "/admin/login";
  };

  return (
    
        <div className="flex min-h-screen w-full overflow-x-auto">

      <Sidebar 
              links={links}
              isOpen={sidebarOpen}
             onClose={() => setSidebarOpen(false)}

      />
      <div className="flex-1 flex flex-col">
        {/* <Header username="Admin" onLogout={handleLogout} /> */}
        <Header
  username="Admin"
  onLogout={handleLogout}
  onMenuClick={() => setSidebarOpen(!sidebarOpen)}

  showNotifications={false}
/>

        
                <main className="p-4 sm:p-6 bg-gray-100 flex-1 overflow-y-auto overflow-x-auto">

          <Outlet /> 
        </main>
      </div>
    </div>
  );
}








