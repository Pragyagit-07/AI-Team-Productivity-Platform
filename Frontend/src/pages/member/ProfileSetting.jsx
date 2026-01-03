import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ProfileSettings() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
 

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
      await API.put("/profile/update", { name,
       
       });

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
      setAvatarLoading(true);
      const res = await API.put("/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile((prev) => ({
        ...prev,
        avatar: res.data.avatar,
      }));
    } catch (err) {
      alert("Avatar upload failed");
    } finally {
      setAvatarLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="mb-8">
      

         <p className=" text-3xl font-bold text-gray-800  text-center">
          Manage your personal information 
        </p> 
      

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT — AVATAR CARD */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="relative group">
            <img
              src={
                profile.avatar
                      ? `${BASE_URL}${profile.avatar}`
                       : "/default-avatar.png"
              }
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover border"
            />

            {/* Hover overlay */}
            <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 cursor-pointer transition">
              {avatarLoading ? "Uploading..." : "Change"}
              <input
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
                className="hidden"
              />
            </label>
          </div>

          <h3 className="mt-4 font-semibold text-gray-800">
            {profile.name}
          </h3>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>

        {/* RIGHT — PROFILE FORM */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <form onSubmit={updateProfile} className="space-y-6">
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                value={profile.email}
                disabled
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

    

            {/* SUBSCRIPTION (READ ONLY, OPTIONAL) */}
            {profile.subscriptionPlan && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Subscription
                </label>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
                  {profile.subscriptionPlan.toUpperCase()}
                </div>
              </div>
            )}

            {/* SAVE BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


