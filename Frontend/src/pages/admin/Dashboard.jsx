import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function AdminDashboard() {
  const links = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Organizations", path: "/admin/dashboard/organizations" },
  { name: "Branches", path: "/admin/dashboard/branches" },
  { name: "Org Users", path: "/admin/dashboard/org-users" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen">
      <Sidebar links={links} />
      <div className="flex-1 flex flex-col">
        <Header username="Admin" onLogout={handleLogout} />
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Outlet /> {/* Nested routes render here */}
        </main>
      </div>
    </div>
  );
}








