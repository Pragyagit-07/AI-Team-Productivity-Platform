// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
// import axios from "axios";

// export default function BranchTable() {
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch organizations from backend
//   const fetchBranches = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/branches");
//       setBranches(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load branches");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this branch?"))
//       return;

//     try {
//       await axios.delete(`http://localhost:5000/api/branches/${id}`);
//       setBranches((prev) => prev.filter((branch) => branch.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete branch");
//     }
//   };

//   if (loading) return <p className="text-center py-4">Loading...</p>;
//   if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Branches</h2>
//         <Link
//           to="/admin/dashboard/branch/add"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Add Branch
//         </Link>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left font-medium">Name</th>
//               <th className="px-6 py-3 text-left font-medium">Email</th>
//               <th className="px-6 py-3 text-left font-medium">Phone</th>
//               <th className="px-6 py-3 text-left font-medium">Address</th>
              
//               <th className="px-6 py-3 text-left font-medium">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {branches.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-500">
//                   No branches found
//                 </td>
//               </tr>
//             ) : (
//               branches.map((branch) => (
//                 <tr key={branch.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">{branch.name}</td>
//                   <td className="px-6 py-4">{branch.email || "—"}</td>
//                   <td className="px-6 py-4">{branch.phone || "_" }</td>
//                   <td className="px-6 py-4">{branch.address || "_"}</td>
                  

//                   <td className="px-6 py-4 flex gap-3">
//                     <Link
//                       to={`/admin/dashboard/branch/edit/${branch.id}`}
//                       className="text-blue-500 hover:text-blue-700"
//                       title="Edit"
//                     >
//                       <FiEdit />
//                     </Link>

//                     <Link
//                       to={`/admin/dashboard/branch/view/${branch.id}`}
//                       className="text-green-500 hover:text-green-700"
//                       title="View"
//                     >
//                       <FiEye />
//                     </Link>

//                     <button
//                       onClick={() => handleDelete(branch.id)}
//                       className="text-red-500 hover:text-red-700"
//                       title="Delete"
//                     >
//                       <FiTrash2 />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios";

export default function BranchTable() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ⬅️ Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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
    if (!window.confirm("Are you sure you want to delete this branch?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/branches/${id}`);
      setBranches((prev) => prev.filter((branch) => branch.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete branch");
    }
  };

  // ⬅️ Pagination Logic
  const totalPages = Math.ceil(branches.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = branches.slice(indexOfFirstRow, indexOfLastRow);

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
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No branches found
                </td>
              </tr>
            ) : (
              currentRows.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{branch.name}</td>
                  <td className="px-6 py-4">{branch.email || "—"}</td>
                  <td className="px-6 py-4">{branch.phone || "_"}</td>
                  <td className="px-6 py-4">{branch.address || "_"}</td>

                  <td className="px-6 py-4 flex gap-3">
                    <Link
                      to={`/admin/dashboard/branch/edit/${branch.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiEdit />
                    </Link>

                    <Link
                      to={`/admin/dashboard/branch/view/${branch.id}`}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FiEye />
                    </Link>

                    <button
                      onClick={() => handleDelete(branch.id)}
                      className="text-red-500 hover:text-red-700"
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

     

{/* Pagination */}
<div className="flex justify-end mt-4">

  <div className="flex items-center gap-2">

    {/* Prev Button */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-3 py-1 rounded border ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-700"
      }`}
    >
      Prev
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
      <button
        key={num}
        onClick={() => setCurrentPage(num)}
        className={`px-3 py-1 rounded border ${
          currentPage === num
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        {num}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
      disabled={currentPage === totalPages}
      className={`px-3 py-1 rounded border ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-700"
      }`}
    >
      Next
    </button>

  </div>
</div>
</div>
  );
}
