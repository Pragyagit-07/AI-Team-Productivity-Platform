// import React, { useState, useEffect } from "react"; 
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function OrgUserEdit() {
//   const navigate = useNavigate();
//   const { id } = useParams(); // userId

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "ADMIN",
//     organizationId: "",
//     branchId: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   // Fetch user data for edit
//   useEffect(() => {
//     if (!id) return;

//     axios
//       .get(`http://localhost:5000/api/org-users/${id}`)
//       .then((res) => setFormData({
//         name: res.data.name,
//         email: res.data.email,
//         role: res.data.role,
//         organizationId: res.data.organizationId,
//         branchId: res.data.branchId,
//         organizationName: res.data.Organization?.name, // for display
//         branchName: res.data.Branch?.name,           // for display
//       }))
//       .catch((err) => console.log("Error fetching user", err));
//   }, [id]);

//   // Handle input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value.toString() }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   // Validation
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     else if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       await axios.put(`http://localhost:5000/api/org-users/${id}`, formData);
//       setMessage("Org User Updated Successfully!");
//       navigate("/admin/dashboard/org-users"); 
//     } catch (err) {
//       console.log(err);
//       setMessage("Failed to update Org User");
//     }
//   };

//   const goBack = () => navigate("/admin/dashboard/org-users");

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">

//       <button
//         onClick={goBack}
//         className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
//       >
//         ← Back
//       </button>

//       <h1 className="text-2xl font-bold mb-6 text-center">Edit Org User</h1>

//       {message && (
//         <p className="text-center text-green-600 font-medium mb-3">{message}</p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Organization (readonly) */}
//         <div>
//           <label className="block font-medium mb-1">Organization</label>
//           <input
//             type="text"
//             value={formData.organizationName || ""}
//             disabled
//             className="w-full  rounded-md p-2 bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         {/* Branch (readonly) */}
//         <div>
//           <label className="block font-medium mb-1">Branch</label>
//           <input
//             type="text"
//             value={formData.branchName || ""}
//             disabled
//             className="w-full  rounded-md p-2 bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         {/* Name */}
//         <div>
//           <label className="block font-medium mb-1">User Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className={`w-full border rounded-md p-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
//           />
//           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block font-medium mb-1">Email</label>
//           <input
//             type="text"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full border rounded-md p-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
//           />
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//         </div>

//         {/* Role */}
//         <div>
//           <label className="block font-medium mb-1">Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full border rounded-md p-2 border-gray-300"
//           >
//             <option value="ADMIN">ADMIN</option>
//             <option value="MEMBER">MEMBER</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-3 pt-4">
//           <button
//             type="button"
//             onClick={goBack}
//             className="px-5 py-2 border border-gray-400 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white rounded-md"
//           >
//             Update User
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function OrgUserEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // userId

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "ADMIN",
    organizationId: "",
    branchId: "",
    password: "" // 🔹 add password
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Fetch user data for edit
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/api/org-users/${id}`)
      .then((res) => setFormData({
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        organizationId: res.data.organizationId,
        branchId: res.data.branchId,
        organizationName: res.data.Organization?.name,
        branchName: res.data.Branch?.name,
        password: "" // password field blank for security
      }))
      .catch((err) => console.log("Error fetching user", err));
  }, [id]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.toString() }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";

    // Optional password validation if user entered a new password
    if (formData.password.trim()) {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
        newErrors.password = "Password must be 8 chars, include uppercase, lowercase, number & special char";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`http://localhost:5000/api/org-users/${id}`, formData);
      setMessage("Org User Updated Successfully!");
      navigate("/admin/dashboard/org-users"); 
    } catch (err) {
      console.log(err);
      setMessage("Failed to update Org User");
    }
  };

  const goBack = () => navigate("/admin/dashboard/org-users");

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">

      <button
        onClick={goBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Edit Org User</h1>

      {message && (
        <p className="text-center text-green-600 font-medium mb-3">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Organization (readonly) */}
        <div>
          <label className="block font-medium mb-1">Organization</label>
          <input
            type="text"
            value={formData.organizationName || ""}
            disabled
            className="w-full rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Branch (readonly) */}
        <div>
          <label className="block font-medium mb-1">Branch</label>
          <input
            type="text"
            value={formData.branchName || ""}
            disabled
            className="w-full rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">User Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-md p-2 border-gray-300"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MEMBER">MEMBER</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className={`w-full border rounded-md p-2 pr-10 ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            <span
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          <p className="text-gray-500 text-sm mt-1">Leave blank to keep current password</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={goBack}
            className="px-5 py-2 border border-gray-400 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Update User
          </button>
        </div>

      </form>
    </div>
  );
}
