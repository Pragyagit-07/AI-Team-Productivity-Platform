// src/pages/admin/Dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaBuilding, FaSitemap, FaUsers, FaUserPlus } from "react-icons/fa";

export default function DashboardHome() {
  const [counts, setCounts] = useState({
    organizations: 0,
    branches: 0,
    orgUsers: 0,
    usersWithoutBranch: 0,
  });
  const [branchData, setBranchData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const COLORS = ["#0088FE", "#FF8042"];

  useEffect(() => {
    fetchCounts();
    fetchBranchData();
    fetchRoleData();
    fetchRecentActivity();
  }, []);

  const fetchCounts = async () => {
    try {
      const [orgs, branches, users] = await Promise.all([
        API.get("/organizations"),
        API.get("/branches"),
        API.get("/org-users"),


      ]);

      const usersWithoutBranch = users.data.filter((u) => !u.branchId).length;

      setCounts({
        organizations: orgs.data.length,
        branches: branches.data.length,
        orgUsers: users.data.length,
        usersWithoutBranch,
      });
    } catch (err) {
      console.log("Error fetching counts", err);
    }
  };

  const fetchBranchData = async () => {
    try {
      const branchesRes= await API.get("/branches");
      const data = await Promise.all(
        branchesRes.data.map(async (branch) => {
          if (!branch.id) return null;
          
          const usersRes = await API.get(`/org-users/branch/${branch.id}`);
          return {
            branch: branch.name,
            users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
          };
        })
      );
      setBranchData(data.filter((d) => d !== null));
    } catch (err) {
      console.log("Error fetching branch data", err);
    }
  };

  const fetchRoleData = async () => {
    try {
    
      const usersRes = await API.get("/org-users");
      const adminCount = usersRes.data.filter((u) => u.role === "ADMIN").length;
      const memberCount = usersRes.data.filter((u) => u.role === "MEMBER").length;

      setRoleData([
        { name: "Admin", value: adminCount },
        { name: "Member", value: memberCount },
      ]);
    } catch (err) {
      console.log("Error fetching role data", err);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      
      const res = await API.get("/org-users");
      const latest = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentActivity(latest);
    } catch (err) {
      console.log("Error fetching recent activity", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg flex items-center gap-4">
          <FaBuilding className="text-4xl sm:text-5xl" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{counts.organizations}</h2>
            <p className="mt-1 text-sm sm:text-base">Organizations</p>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-lg flex items-center gap-4">
          <FaSitemap className="text-4xl sm:text-5xl" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{counts.branches}</h2>
            <p className="mt-1 text-sm sm:text-base">Branches</p>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-lg flex items-center gap-4">
          <FaUsers className="text-4xl sm:text-5xl" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{counts.orgUsers}</h2>
            <p className="mt-1 text-sm sm:text-base">Org Users</p>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-lg flex items-center gap-4">
          <FaUserPlus className="text-4xl sm:text-5xl" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{counts.usersWithoutBranch}</h2>
            <p className="mt-1 text-sm sm:text-base">Users without Branch</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Users per Branch</h2>
          <div className="w-full h-64 sm:h-80 md:h-96">
            {branchData.length === 0 ? (
              <p className="text-gray-500 text-center">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchData}>
                  <XAxis dataKey="branch" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Users by Role</h2>
          <div className="w-full h-64 sm:h-80 md:h-96">
            {roleData.length === 0 ? (
              <p className="text-gray-500 text-center">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <p className="text-gray-500 text-center">No recent activity</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((user) => (
              <li
                key={user.id}
                className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-500 text-sm">
                    {user.Organization?.name || "No Org"} - {user.Branch?.name || "No Branch"}
                  </p>
                </div>
                <span className="text-gray-400 text-sm mt-1 sm:mt-0">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
