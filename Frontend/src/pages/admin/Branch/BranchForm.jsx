import React, { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BranchForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    organizationId: ""
    
  });
const [organizations, setOrganizations] = useState([]);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); 


  // fetch organization

useEffect(() => {
  axios
    .get("http://localhost:5000/api/organizations")
    .then((res) => setOrganizations(res.data))
    .catch((err) => console.log("Error fetching organizations:", err));
}, []);


  // Handle Change
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

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,}$/.test(formData.phone))
      newErrors.phone = "Phone must be at least 10 digits";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.trim().length < 10)
      newErrors.address = "Address must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler (API Connect)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // ❗ validation first

    try {
      const res = await axios.post(
        "http://localhost:5000/api/branches",
        formData
      );

      setMessage("Branch saved successfully!");
      console.log(res.data);

      // redirect to table page after save
      setTimeout(() => navigate("/admin/dashboard/branches"), 600);

    } catch (err) {
      setMessage("Failed to save branches");
      console.log(err);
    }
  };

  // Back & Cancel
  const goBack = () => navigate("/admin/dashboard/branches");

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">

      {/* 🔙 Top Left Back Button */}
      <button
        onClick={goBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Create Branch</h1>

      {message && (
        <p className="text-center text-green-600 font-medium mb-3">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">


{/* Organization Select */}
<div>
  <label className="block font-medium mb-1">Organization</label>

  <select
    name="organizationId"
    value={formData.organizationId}
    onChange={handleChange}
    className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
      errors.organizationId
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
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





        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Branch Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter branch name"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter branch email"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        


        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter branch address"
            rows={3}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
              errors.address
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* 🔘 Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">

          {/* Cancel */}
          <button
            type="button"
            onClick={goBack}
            className="px-5 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Save Branch
          </button>

        </div>
      </form>
    </div>
  );
}
