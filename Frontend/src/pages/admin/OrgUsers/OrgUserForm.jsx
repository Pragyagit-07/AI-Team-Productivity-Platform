import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function OrgUserForm() {
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",   // default
    organizationId: "",
    branchId: ""
  });

  const [organizations, setOrganizations] = useState([]);
  const [branches, setBranches] = useState([]);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Fetch all organizations
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/organizations")
      .then((res) => setOrganizations(res.data))
      .catch((err) => console.log("Error fetching organizations", err));
  }, []);

  // Fetch branches on organization change
  useEffect(() => {
    if (!formData.organizationId) {
      setBranches([]);
      return;
    }

    axios
      .get("http://localhost:5000/api/branches?orgId=" + formData.organizationId)
      .then((res) => setBranches(res.data))
      .catch((err) => console.log("Error fetching branches", err));
  }, [formData.organizationId]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value.toString() }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.organizationId.trim())
      newErrors.organizationId = "Organization is required";

    if (!formData.branchId.trim())
      newErrors.branchId = "Branch is required";

    if (!formData.name.trim())
      newErrors.name = "Name is required";
    else if (formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password.trim())
  newErrors.password = "Password is required";
else if (
  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  .test(formData.password)
)
  newErrors.password =
    "Password must be 8 chars, include uppercase, lowercase, number & special character";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/org-users",
        formData
      );

      setMessage("Org User Created Successfully!");

      setTimeout(() => navigate("/admin/dashboard/org-users"), 600);
    } catch (err) {
      setMessage("Failed to save Org User");
      console.log(err);
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

      <h1 className="text-2xl font-bold mb-6 text-center">Create Org User</h1>

      {message && (
        <p className="text-center text-green-600 font-medium mb-3">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Organization */}
        <div>
          <label className="block font-medium mb-1">Organization</label>
          <select
            name="organizationId"
            value={formData.organizationId}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 ${
              errors.organizationId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Organization</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
          {errors.organizationId && (
            <p className="text-red-500 text-sm mt-1">{errors.organizationId}</p>
          )}
        </div>

        {/* Branch */}
        <div>
          <label className="block font-medium mb-1">Branch</label>
          <select
            name="branchId"
            value={formData.branchId}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 ${
              errors.branchId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          {errors.branchId && (
            <p className="text-red-500 text-sm mt-1">{errors.branchId}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">User Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter user name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter user email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        {/* Password */}
<div>
  <label className="block font-medium mb-1">Password</label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Enter password"
      value={formData.password}
      onChange={handleChange}
      className={`w-full border rounded-md p-2 pr-10 ${
        errors.password ? "border-red-500" : "border-gray-300"
      }`}
    />

    {/* Eye / EyeOff Icon */}
    <span
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-2.5 cursor-pointer text-gray-600 hover:text-gray-800"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </span>
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
  )}
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
            Save User
          </button>
        </div>
      </form>
    </div>
  );
}
