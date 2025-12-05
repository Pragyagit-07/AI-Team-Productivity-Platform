import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios";

export default function OrganizationTable() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch organizations from backend
  const fetchOrganizations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/organizations");
      setOrganizations(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load organizations");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this organization?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/organizations/${id}`);
      setOrganizations((prev) => prev.filter((org) => org.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete organization");
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Organizations</h2>
        <Link
          to="/admin/dashboard/organization/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Organization
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Domain</th>
              <th className="px-6 py-3 text-left font-medium">Phone</th>
              <th className="px-6 py-3 text-left font-medium">Address</th>
              <th className="px-6 py-3 text-left font-medium">Contact Person</th>
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {organizations.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No organizations found
                </td>
              </tr>
            ) : (
              organizations.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{org.name}</td>
                  <td className="px-6 py-4">{org.domain || "—"}</td>
                  <td className="px-6 py-4">{org.phone || "_" }</td>
                  <td className="px-6 py-4">{org.address || "_"}</td>
                  <td className="px-6 py-4">{org.createdBy || "—"}</td>

                  <td className="px-6 py-4 flex gap-3">
                    <Link
                      to={`/admin/dashboard/organization/edit/${org.id}`}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FiEdit />
                    </Link>

                    <Link
                      to={`/admin/dashboard/organization/view/${org.id}`}
                      className="text-green-500 hover:text-green-700"
                      title="View"
                    >
                      <FiEye />
                    </Link>

                    <button
                      onClick={() => handleDelete(org.id)}
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
