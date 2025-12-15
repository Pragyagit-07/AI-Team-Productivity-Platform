

import { useEffect, useState } from "react";
import axios from "axios";
import { X, Send, Upload } from "lucide-react";

export default function TaskDetailSidePanel({ taskId, onClose, onTaskUpdated }) {
  const [task, setTask] = useState(null);
  const [activeTab, setActiveTab] = useState("comments");
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  /* ================= FETCH ================= */
  const fetchTaskDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (taskId) fetchTaskDetails();
  }, [taskId]);

  /* ================= UPDATE FIELD ================= */
  const updateTask = async (field, value) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
      { [field]: value },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchTaskDetails();   // Side panel update
    onTaskUpdated?.();   // ⭐ TaskBoard update
  } catch (err) {
    console.error(err);
  }
};


  /* ================= COMMENT ================= */
  const postComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        { taskId, text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchTaskDetails();
    } catch (err) {
      console.error(err);
    }
  };

  if (!task) return null;

  /* ================= COLOR HELPERS ================= */
  const priorityColor =
    task.priority === "high"
      ? "bg-red-200 text-red-800"
      : task.priority === "medium"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-green-200 text-green-800";

  const statusColor =
    task.status === "done"
      ? "bg-green-200 text-green-800"
      : task.status === "inprogress"
      ? "bg-blue-200 text-blue-800"
      : "bg-gray-200 text-gray-700";

  /* ================= UI ================= */
  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[460px] bg-white shadow-xl overflow-y-auto">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        <X />
      </button>

      <div className="p-6 space-y-6">
        {/* ================= TITLE ================= */}
        <div>
          <label className="text-xs text-gray-500">Task Title</label>
          <input
            value={task.title}
            onChange={(e) => updateTask("title", e.target.value)}
            className="w-full text-xl font-semibold outline-none bg-transparent"
          />
        </div>

        {/* ================= META ================= */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* Status */}
          <div>
            <label className="text-xs text-gray-500">Status</label>
            <select
              value={task.status}
              onChange={(e) => updateTask("status", e.target.value)}
              className={`w-full p-2 rounded ${statusColor}`}
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="text-xs text-gray-500">Priority</label>
            <select
              value={task.priority}
              onChange={(e) => updateTask("priority", e.target.value)}
              className={`w-full p-2 rounded ${priorityColor}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="text-xs text-gray-500">Start Date</label>
            <input
              type="date"
              value={task.startDate?.slice(0, 10) || ""}
              onChange={(e) => updateTask("startDate", e.target.value)}
              className="w-full p-2 rounded bg-gray-100"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="text-xs text-gray-500">Due Date</label>
            <input
              type="date"
              value={task.dueDate?.slice(0, 10) || ""}
              onChange={(e) => updateTask("dueDate", e.target.value)}
              className="w-full p-2 rounded bg-gray-100"
            />
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div>
          <label className="text-xs text-gray-500">Description</label>
          <textarea
            rows="3"
            value={task.description || ""}
            onChange={(e) => updateTask("description", e.target.value)}
            className="w-full p-2 rounded bg-gray-100 resize-none"
            placeholder="Add task description..."
          />
        </div>

        {/* ================= TABS ================= */}
        <div className="flex gap-6 text-sm">
          {["comments", "activity", "files"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize pb-2 ${
                activeTab === tab
                  ? "text-blue-600 font-medium border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= COMMENTS ================= */}
        {activeTab === "comments" && (
          <div className="space-y-4">
            {task.comments?.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                  {c.userName?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{c.userName}</p>
                  <p className="text-sm text-gray-600">{c.text}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2 rounded bg-gray-100"
              />
              <button
                onClick={postComment}
                className="p-2 bg-blue-500 text-white rounded"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ================= ACTIVITY ================= */}
        {activeTab === "activity" && (
          <div className="space-y-3">
            {task.activities?.map((a) => (
              <div key={a.id} className="text-sm">
                <p className="font-medium">{a.userName}</p>
                <p className="text-gray-600">{a.description}</p>
                <p className="text-xs text-gray-400">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ================= FILES ================= */}
        {activeTab === "files" && (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-blue-600 cursor-pointer">
              <Upload size={16} /> Upload File
              <input type="file" hidden />
            </label>

            {task.files?.map((f) => (
              <a
                key={f.id}
                href={f.url}
                target="_blank"
                className="block text-sm text-blue-600 hover:underline"
              >
                {f.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
