import { Routes, Route, Navigate } from "react-router-dom";

function DashboardHome() {
  const orgUser = JSON.parse(localStorage.getItem("orgUser"));

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome {orgUser?.email}
      </h1>
      <p>Organization Dashboard</p>
    </div>
  );
}

export default function OrgDashboard() {
  const token = localStorage.getItem("orgToken");

  if (!token) {
    return <Navigate to="/org/login" />;
  }

  return (
    <div className="p-6">
      <Routes>
        <Route index element={<DashboardHome />} />
      </Routes>
    </div>
  );
}
