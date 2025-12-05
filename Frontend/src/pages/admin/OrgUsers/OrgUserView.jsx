import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function OrgUserView() {
  const { id } = useParams(); // orgUserId
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/org-users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load user details");
    }
  };

  const goBack = () => navigate("/admin/dashboard/org-users");
  const goEditUser = () => navigate(`/admin/dashboard/org-user/edit/${id}`);

  if (!user) {
    return (
      <div className="flex justify-center mt-20 text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">

      {/* Back Button */}
      <button
        onClick={goBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Org User Details</h1>

      {message && (
        <p className="text-center text-red-500 font-medium mb-3">{message}</p>
      )}

      {/* TWO-COLUMN DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 font-medium">Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>


        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 font-medium">Role</p>
            <p className="text-lg font-semibold">{user.role}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Organization</p>
            <p className="text-lg font-semibold">{user.Organization?.name}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Branch</p>
            <p className="text-lg font-semibold">{user.Branch?.name}</p>
          </div>
        </div>

      </div>

      {/* Edit Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={goEditUser}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <FaEdit /> Edit User
        </button>
      </div>

    </div>
  );
}
