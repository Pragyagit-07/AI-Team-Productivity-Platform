import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios";

export default function BranchTable() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch organizations from backend
  const fetchBranches = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/branches");
      setBranches(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load branches");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/branches/${id}`);
      setBranches((prev) => prev.filter((branch) => branch.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete branch");
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Branches</h2>
        <Link
          to="/admin/dashboard/branch/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Branch
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Phone</th>
              <th className="px-6 py-3 text-left font-medium">Address</th>
              
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {branches.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No branches found
                </td>
              </tr>
            ) : (
              branches.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{branch.name}</td>
                  <td className="px-6 py-4">{branch.email || "—"}</td>
                  <td className="px-6 py-4">{branch.phone || "_" }</td>
                  <td className="px-6 py-4">{branch.address || "_"}</td>
                  

                  <td className="px-6 py-4 flex gap-3">
                    <Link
                      to={`/admin/dashboard/branch/edit/${branch.id}`}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FiEdit />
                    </Link>

                    <Link
                      to={`/admin/dashboard/branch/view/${branch.id}`}
                      className="text-green-500 hover:text-green-700"
                      title="View"
                    >
                      <FiEye />
                    </Link>

                    <button
                      onClick={() => handleDelete(branch.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
