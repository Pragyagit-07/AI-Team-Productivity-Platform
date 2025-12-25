import React, { useState, useEffect } from "react";
import API from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function OrganizationEdit() {
  const { id } = useParams(); // get ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    phone: "",
    createdBy: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  
  //  Fetch Organization by ID
    useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/organizations/${id}`);
        setFormData(res.data); 
      } catch (err) {
        console.log(err);
        setMessage("Failed to load organization data");
      }
    };

    fetchData();
  }, [id]);

  // Change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (!formData.domain.trim()) newErrors.domain = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.domain))
      newErrors.domain = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{10,}$/.test(formData.phone))
      newErrors.phone = "Phone must be at least 10 digits";
     if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.trim().length < 10)
      newErrors.address = "Address must be at least 10 characters";
     setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update Handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await API.put(`/organizations/${id}`, formData);
      setMessage("Organization updated successfully!");
      console.log(res.data);
      setTimeout(() => navigate("/admin/dashboard/organizations"), 700);

    } catch (err) {
      console.log(err);
      setMessage("Failed to update organization");
    }
  };

  const goBack = () => navigate("/admin/dashboard/organizations");

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">

      {/* Back Button */}
      <button
        onClick={goBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Edit Organization</h1>

      {message && (
        <p className="text-center text-green-600 font-medium mb-3">
          {message}
        </p>
      )}

      <form onSubmit={handleUpdate} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Organization Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter organization name"
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

        {/* Domain */}
        <div>
          <label className="block font-medium mb-1">Domain</label>
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            placeholder="Enter organization email"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
              errors.domain
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.domain && (
            <p className="text-red-500 text-sm mt-1">{errors.domain}</p>
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

        {/* Contact Person */}
        <div>
          <label className="block font-medium mb-1">Contact Person</label>
          <textarea
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            placeholder="Enter contact person name"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
              errors.createdBy
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            placeholder="Enter organization address"
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
            Update Organization
          </button>
        </div>
      </form>
    </div>
  );
}
