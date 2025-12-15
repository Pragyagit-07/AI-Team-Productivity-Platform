




import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, FolderKanban } from "lucide-react";

export default function ProjectForm() {
  const { id } = useParams(); // edit mode
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [members, setMembers] = useState([]); // selected member IDs
  const [allUsers, setAllUsers] = useState([]); // all users for selection
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planned",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch all users for member selection
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/members`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers();
  }, []);

  // Fetch project details in edit mode
  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, description, status, startDate, endDate, members } = res.data;
        setFormData({
          name,
          description,
          status,
          startDate: startDate ? startDate.slice(0, 10) : "",
          endDate: endDate ? endDate.slice(0, 10) : "",
        });

        setMembers(members.map((m) => m.id));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch project data");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMemberDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const payload = { ...formData, members };

      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/projects/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/projects`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate("/dashboard/projects");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleMember = (id) => {
    if (members.includes(id)) {
      setMembers(members.filter((m) => m !== id));
    } else {
      setMembers([...members, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <FolderKanban className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">
            {id ? "Edit Project" : "Create Project"}
          </h2>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Project Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-white"
            >
              <option value="planned">Planned</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="onhold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              disabled={!!id}
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Members Dropdown */}
          <div className="md:col-span-2 flex flex-col relative" ref={dropdownRef}>
            <label className="text-sm font-semibold text-gray-700 mb-2">Assign Members</label>

            {/* Button */}
            <button
              type="button"
              onClick={() => setMemberDropdownOpen(!memberDropdownOpen)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white flex justify-between items-center focus:ring-2 focus:ring-blue-500"
            >
              {members.length === 0
                ? "Select Assignee Members"
                : allUsers
                    .filter((u) => members.includes(u.id))
                    .map((u) => u.name)
                    .join(", ")}
              <span className="ml-2">&#9662;</span>
            </button>

            {/* Dropdown */}
            {memberDropdownOpen && (
              <div className="absolute z-20 top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {allUsers.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={members.includes(user.id)}
                      onChange={() => toggleMember(user.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{user.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter project description"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col md:flex-row justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/projects")}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition w-full md:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-xl text-white font-semibold transition w-full md:w-auto ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : id ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
