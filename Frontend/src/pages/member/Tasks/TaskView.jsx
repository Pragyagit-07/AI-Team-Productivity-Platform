import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api/axios";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Calendar,
   Flag,
  Layers,
  Clock,
  Users
} from "lucide-react";
export default function TaskView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      navigate("/dashboard/tasks");
    } catch (err) {
      alert("Delete failed");
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "-";
  const statusColor = (s) =>
    s === "done"
      ? "bg-green-100 text-green-700"
      : s === "inprogress"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-200 text-gray-700";

  const priorityColor = (p) =>
    p === "high"
      ? "bg-red-100 text-red-700"
      : p === "medium"
      ? "bg-orange-100 text-orange-700"
      : "bg-blue-100 text-blue-700";

  if (loading)
    return <p className="text-center mt-10 font-semibold">Loading task...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 font-medium"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dashboard/tasks/edit/${task.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >
            <Pencil size={16} /> 
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            <Trash2 size={16} /> 
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* PROJECT CARD */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Layers /> Project Details
          </h2>

          <p className="mb-2"><b>Name:</b> {task.Project?.name || "-"}</p>
          <p className="mb-2">
            <b>Start Date:</b> {formatDate(task.Project?.startDate)}
          </p>
         <p className="mb-2">
            <b>Completion Date:</b> {formatDate(task.Project?.endDate)}
          </p>
          <p className="mb-2">
            <b>Status:</b>{" "}
            <span className={`px-2 py-1 rounded ${statusColor(task.Project?.status)}`}>
              {task.Project?.status || "-"}
            </span>
          </p>

          <p className="mb-2">
            <b>Created By:</b> {task.Project?.creator?.name || "-"}
          </p>

          <p className="mb-3">
            <b>Description:</b><br />
            <span className="text-gray-600">
            {task.Project?.description || "No description"}
            </span>
          </p>

          {/* MEMBERS */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} />
              <b>Members</b>
            </div>

            <div className="flex gap-2 flex-wrap">
              {task.Project?.members?.length > 0 ? (
                task.Project.members.map((m) => (
                  <div
                    key={m.id}
                    className="px-3 py-1 rounded-full bg-indigo-500 text-white text-sm"
                  >
                    {m.name}
                  </div>
                ))
              ) : (
                <span className="text-gray-400">No members</span>
              )}
            </div>
          </div>
        </div>

        {/* TASK CARD */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Flag /> Task Details
          </h2>

          <p className="mb-2"><b>Title:</b> {task.title}</p>
          <p className="mb-2">
            <b>Start Date:</b>{" "}
            {formatDate(task.startDate || task.createdAt)}
          </p>
          <p className="mb-2">
          <b>Due Date:</b> {formatDate(task.dueDate)}
          </p>
           <p className="mb-2">
            <b>Status:</b>{" "}
            <span className={`px-2 py-1 rounded ${statusColor(task.status)}`}>
              {task.status}
            </span>
          </p>

          <p className="mb-2">
            <b>Priority:</b>{" "}
            <span className={`px-2 py-1 rounded ${priorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </p>

          <p className="mb-2">
            <b>Assignee:</b>{" "}
            {task.assignee ? task.assignee.name : "Unassigned"}
          </p>

          <p>
            <b>Description:</b><br />
            <span className="text-gray-600">
              {task.description || "No description"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

