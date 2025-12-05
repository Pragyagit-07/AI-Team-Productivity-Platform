import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function BranchEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // branch id from URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    organizationId: "",
  });

  const [organizations, setOrganizations] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Fetch Branch Data + Organizations
  useEffect(() => {
    // 1️⃣ Load existing branch data
    axios
      .get(`http://localhost:5000/api/branches/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => console.log("Branch fetch error:", err));

    // 2️⃣ Load organizations
    axios
      .get("http://localhost:5000/api/organizations")
      .then((res) => setOrganizations(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,}$/.test(formData.phone))
      newErrors.phone = "Phone must be at least 10 digits";

    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit / Update Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.put(
        `http://localhost:5000/api/branches/${id}`,
        formData
      );

      setMessage("Branch updated successfully!");

      setTimeout(() => navigate("/admin/dashboard/branches"), 800);

    } catch (err) {
      console.log(err);
      setMessage("Failed to update branch");
    }
  };

  // Back Button
  const goBack = () => navigate("/admin/dashboard/branches");


  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      
      <button
        onClick={goBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Edit Branch</h1>

      {message && (
        <p className="text-center text-green-600 font-medium mb-3">{message}</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {/* Organization (Disabled) */}
        <div >
          <label className="block font-medium mb-2">Organization</label>

          <select
            name="organizationId"
            value={formData.organizationId}
            disabled
            className="w-full border rounded-lg p-2 bg-gray-100 text-gray-900 cursor-not-allowed"
          >
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>

    
        </div>

        {/* Branch Name */}
        <div>
          <label className="block font-medium mb-1">Branch Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded-md p-2 focus:ring-2 ${
              errors.address
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={goBack}
            className="px-5 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Update Branch
          </button>
        </div>
      </form>
    </div>
  );
}
