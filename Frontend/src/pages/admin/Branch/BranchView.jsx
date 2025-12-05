import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function BranchView() {
  const { id } = useParams(); // branchId
  const navigate = useNavigate();

  const [branch, setBranch] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Load branch & org users under this branch
  useEffect(() => {
    loadBranch();
    loadOrgUsers();
  }, [id]);

  const loadBranch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/branches/${id}`);
      setBranch(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load branch details");
    }
  };

  const loadOrgUsers = async () => {
    try {
     const res = await axios.get(
  // `http://localhost:5000/api/orgusers/branch/${id}`
  `http://localhost:5000/api/org-users/branch/${id}`

);
  console.log("Branch ID:", id);


      setUsers(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load users");
    }
  };

  const goBack = () => navigate("/admin/dashboard/branches");

  const goAddOrgUser = () =>
    navigate(`/admin/dashboard/org-user/add?branchId=${id}`);

  const goViewUser = (userId) =>
    navigate(`/admin/dashboard/org-user/view/${userId}`);

  const goEditUser = (userId) =>
    navigate(`/admin/dashboard/org-user/edit/${userId}`);

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      
      await axios.delete(`http://localhost:5000/api/org-users/${userId}`);
loadOrgUsers();

    } catch (err) {
      console.log(err);
      alert("Failed to delete user");
    }
  };

  if (!branch) {
    return (
      <div className="flex justify-center mt-20 text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">

      {/* 🔙 Back Button */}
      <button
        onClick={goBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        Branch Details
      </h1>

      {message && (
        <p className="text-center text-red-500 font-medium mb-3">{message}</p>
      )}

      {/* BRANCH DETAILS CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-4">

          <div>
            <p className="text-gray-600 font-medium">Branch Name</p>
            <p className="text-lg font-semibold">{branch.name}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Email</p>
            <p className="text-lg font-semibold">{branch.email}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Phone</p>
            <p className="text-lg font-semibold">{branch.phone}</p>
          </div>

        </div>

        <div className="space-y-4">

          <div>
            <p className="text-gray-600 font-medium">Address</p>
            <p className="text-lg font-semibold whitespace-pre-line">
              {branch.address}
            </p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Organization</p>
            <p className="text-lg font-semibold">{branch.Organization?.name}</p>
          </div>

        </div>

      </div>

      {/* ORG USER SECTION */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold"> Org Users</h2>

          <button
            onClick={goAddOrgUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Add Org User
          </button>
        </div>

        {/* USERS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-4 text-gray-500"
                  >
                    No users found for this branch.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                
                    <td className="p-3">{u.role}</td>

                    <td className="p-3 flex justify-center gap-3">
                      <FaEye
                        className="text-blue-600 cursor-pointer"
                        onClick={() => goViewUser(u.id)}
                      />
                      <FaEdit
                        className="text-green-600 cursor-pointer"
                        onClick={() => goEditUser(u.id)}
                      />
                      <FaTrash
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteUser(u.id)}
                      />
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}





