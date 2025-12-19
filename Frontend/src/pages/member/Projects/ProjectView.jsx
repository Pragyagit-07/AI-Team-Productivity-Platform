import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, FolderKanban, Calendar, User, Clipboard } from "lucide-react";

export default function ProjectView() {
  const { id } = useParams(); // projectId
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "planned": return "bg-blue-100 text-blue-800";
      case "inprogress": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "onhold": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!project) return <p className="text-center mt-10 text-red-500">Project not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      {/* Back Button */}
      <div className="w-full max-w-4xl flex justify-start mb-6">
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </button>
      </div>

      {/* Project Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition">
        <div className="flex items-center gap-3 mb-6">
          <FolderKanban className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">{project.name}</h2>
        </div>

        {/* Status Badge */}
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-6 ${getStatusColor(project.status)}`}>
          {project.status.replace(/([A-Z])/g, " $1").toUpperCase()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {/* Creator */}
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <span><strong>Created By:</strong> {project.creator?.name || "-"}</span>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>
              <strong>Start:</strong> {project.startDate ? new Date(project.startDate).toLocaleDateString() : "-"} |{" "}
              <strong>End:</strong> {project.endDate ? new Date(project.endDate).toLocaleDateString() : "-"}
            </span>
          </div>

          {/* Assignee Members */}
          <div className="md:col-span-2 flex flex-wrap items-center gap-2">
            <User className="h-5 w-5 text-gray-500 mt-1" />
            <div>
              <strong>Assignees:</strong>
              {project.members && project.members.length > 0 ? (
                <p className="mt-1 text-gray-600">
                  {project.members.map((m) => m.name).join(", ")}
                </p>
              ) : (
                <p className="mt-1 text-gray-400">No members assigned</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex items-start gap-2">
            <Clipboard className="h-5 w-5 text-gray-500 mt-1" />
            <div>
              <strong>Description:</strong>
              <p className="mt-1 text-gray-600">{project.description || "-"}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <button
            onClick={() => navigate(`/dashboard/projects/${id}/tasks`)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            View Tasks
          </button>

          <button
            onClick={() => navigate(`/dashboard/projects/${id}/tasks/add`)}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
