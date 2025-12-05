// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function OrganizationView() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [data, setData] = useState(null);
//   const [message, setMessage] = useState("");

//   // Fetch organization
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/organizations/${id}`
//         );
//         setData(res.data);
//       } catch (err) {
//         console.log(err);
//         setMessage("Failed to load organization details");
//       }
//     };

//     loadData();
//   }, [id]);

//   const goBack = () => navigate("/admin/dashboard/organizations");
//   const goEdit = () => navigate(`/admin/dashboard/organization/edit/${id}`);

//   if (!data) {
//     return (
//       <div className="flex justify-center mt-20 text-gray-600 text-lg">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">

//       {/* Back Button */}
//       <button
//         onClick={goBack}
//         className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
//       >
//         ← Back
//       </button>

//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Organization Details
//       </h1>

//       {message && (
//         <p className="text-center text-red-500 font-medium mb-3">
//           {message}
//         </p>
//       )}

//       {/* Details Card */}
//       <div className="space-y-4">

//         {/* Name */}
//         <div>
//           <p className="text-gray-600 font-medium">Organization Name</p>
//           <p className="text-lg font-semibold">{data.name}</p>
//         </div>

//         {/* Domain */}
//         <div>
//           <p className="text-gray-600 font-medium">Domain (Email)</p>
//           <p className="text-lg font-semibold">{data.domain}</p>
//         </div>

//         {/* Phone */}
//         <div>
//           <p className="text-gray-600 font-medium">Phone</p>
//           <p className="text-lg font-semibold">{data.phone}</p>
//         </div>

//         {/* Contact Person */}
//         <div>
//           <p className="text-gray-600 font-medium">Contact Person</p>
//           <p className="text-lg font-semibold">{data.createdBy}</p>
//         </div>

//         {/* Address */}
//         <div>
//           <p className="text-gray-600 font-medium">Address</p>
//           <p className="text-lg font-semibold whitespace-pre-line">
//             {data.address}
//           </p>
//         </div>

//         {/* Created Date */}
//         {data.createdAt && (
//           <div>
//             <p className="text-gray-600 font-medium">Created On</p>
//             <p className="text-lg font-semibold">
//               {new Date(data.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 mt-6">

//         <button
//           onClick={goEdit}
//           className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
//         >
//           Edit Organization
//         </button>

//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function OrganizationView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [organization, setOrganization] = useState(null);
  const [branches, setBranches] = useState([]);
  const [message, setMessage] = useState("");

  // Load organization + branches
  useEffect(() => {
    loadOrganization();
    loadBranches();
  }, [id]);

  const loadOrganization = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/organizations/${id}`);
      setOrganization(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load organization details");
    }
  };

  const loadBranches = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/branches?organizationId=${id}`);
      setBranches(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load branches");
    }
  };

  const goBack = () => navigate("/admin/dashboard/organizations");
  const goEdit = () => navigate(`/admin/dashboard/organization/edit/${id}`);

  // const goAddBranch = () => navigate(`/admin/dashboard/branch/add`);
  const goAddBranch = () => navigate(`/admin/dashboard/branch/add?organizationId=${id}`);


  const goEditBranch = (branchId) =>
    navigate(`/admin/dashboard/branch/edit/${branchId}`);

  const goViewBranch = (branchId) =>
    navigate(`/admin/dashboard/branch/view/${branchId}`);

  const deleteBranch = async (branchId) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/branches/${branchId}`);
      loadBranches();
    } catch (err) {
      console.log(err);
      alert("Failed to delete branch");
    }
  };

  if (!organization) {
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

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        Organization Details
      </h1>

      {message && (
        <p className="text-center text-red-500 font-medium mb-3">{message}</p>
      )}

      {/* ORG Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-4">

          <div>
            <p className="text-gray-600 font-medium">Organization Name</p>
            <p className="text-lg font-semibold">{organization.name}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Domain</p>
            <p className="text-lg font-semibold">{organization.domain}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Phone</p>
            <p className="text-lg font-semibold">{organization.phone}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Contact Person</p>
            <p className="text-lg font-semibold">{organization.createdBy}</p>
          </div>

        </div>

        <div className="space-y-4">

          <div>
            <p className="text-gray-600 font-medium">Address</p>
            <p className="text-lg font-semibold whitespace-pre-line">
              {organization.address}
            </p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Created On</p>
            <p className="text-lg font-semibold">
              {new Date(organization.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Edit Button */}
          <button
            onClick={goEdit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
          >
            Edit Organization
          </button>

        </div>

      </div>

      {/* BRANCH SECTION */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Branches</h2>
          <button
            onClick={goAddBranch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Add Branch
          </button>
        </div>

        {/* Branch Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100 ">
              <tr>
                <th className="p-3 text-left">Branch Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {branches.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No branches found.
                  </td>
                </tr>
              ) : (
                branches.map((b) => (
                  <tr key={b.id} className=" hover:bg-gray-50">
                    <td className="p-3">{b.name}</td>
                    <td className="p-3">{b.email}</td>
                    <td className="p-3">{b.phone}</td>
                    <td className="p-3">{b.address}</td>

                    <td className="p-3 flex justify-center gap-3">
                      <FaEye
                        className="text-blue-600 cursor-pointer"
                        onClick={() => goViewBranch(b.id)}
                      />
                      <FaEdit
                        className="text-green-600 cursor-pointer"
                        onClick={() => goEditBranch(b.id)}
                      />
                      <FaTrash
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteBranch(b.id)}
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
