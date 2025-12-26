import { useEffect, useState } from "react";
import { useNavigate , useParams} from "react-router-dom";
import API from "../../../api/axios";
import { ArrowLeft, PlusCircle } from "lucide-react";

export default function TaskForm({ projectId, onTaskSaved }) {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEdit = window.location.pathname.includes("/edit/"); 
  const taskId = isEdit ? id : null;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    assigneeId: "", 
  });

  const [members, setMembers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [projectIdState, setProjectIdState] = useState(projectId || null);


  // Fetch project members for assignee select
  useEffect(() => {
  if (!projectIdState) return;

  const fetchMembers = async () => {
    try {
      
      const res = await API.get(`/projects/${projectIdState}/members`);
      setMembers(res.data);
    } catch {
      setError("Failed to fetch project members");
    }
  };

  fetchMembers();
}, [projectIdState]);


 useEffect(() => {
  if (!isEdit) return;

  const fetchTask = async () => {
    try {
      
const res = await API.get(`/tasks/${taskId}`);
      const task = res.data;

      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        assigneeId: task.assigneeId || "",
      });

      
      setProjectIdState(task.projectId);

    } catch (err) {
      setError("Failed to load task");
    }
  };

  fetchTask();
}, [taskId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const payload = {
        ...formData,
        projectId: projectIdState,

      };

        if (isEdit) {
      
      await API.put(`/tasks/${id}`, payload);
    
  } else {
            await API.post(`/tasks`, payload);
           }

      if (onTaskSaved) onTaskSaved();
      navigate(-1);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <PlusCircle className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">
          {isEdit ? "Edit Task" : "Create Task"}
          </h2>
         </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
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
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Assignee */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Assignee</label>
            <select
              name="assigneeId"
              value={formData.assigneeId}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="">Select Assignee</option>
              {members.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Task description"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              
              {loading ? "Saving..." : isEdit ? "Update Task" : "Create Task"}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}