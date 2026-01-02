import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ProfileSettings() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= GET PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me");
        setProfile(res.data);
        setName(res.data.name);
      } catch (err) {
        console.error("Profile load error", err);
      }
    };
    fetchProfile();
  }, []);

  // ================= UPDATE NAME =================
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.put("/profile/update", { name });
      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.msg || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPLOAD AVATAR =================
  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await API.put("/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile((prev) => ({
        ...prev,
        avatar: res.data.avatar,
      }));
    } catch (err) {
      alert("Avatar upload failed");
    }
  };

  if (!profile) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Profile Settings
      </h1>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <img
          src={
            profile.avatar
              ? `http://localhost:5000/api${profile.avatar}`
              : "/default-avatar.png"
          }
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border"
        />

        <label className="text-sm text-indigo-600 cursor-pointer">
          Profile 
          <input
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            className="hidden"
          />
        </label>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={updateProfile}
        className="bg-white shadow rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full  rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Email
          </label>
          <input
            value={profile.email}
            disabled
            className="w-full  rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
