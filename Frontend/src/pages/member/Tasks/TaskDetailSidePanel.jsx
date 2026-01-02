import { useEffect, useState } from "react";
import { X, Send, Upload } from "lucide-react";
import API from "../../../api/axios";

export default function TaskDetailSidePanel({ taskId, onClose, onTaskUpdated }) {
  const [task, setTask] = useState(null);
  const [activeTab, setActiveTab] = useState("comments");
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");
const [description, setDescription] = useState("");
const API_URL = import.meta.env.VITE_API_URL;

  /* FETCH */
  const fetchTaskDetails = async () => {
    try {
      const res = await API.get(`/tasks/${taskId}`);
      setTask(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (taskId) fetchTaskDetails();
  }, [taskId]);
  // for description
  useEffect(() => {
  if (task?.description !== undefined) {
    setDescription(task.description || "");
  }
}, [task]);
const saveDescription = () => {
  if (description !== task.description) {
    updateTask("description", description);
  }
};
// upload file

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('taskId', taskId);

  try {
    await API.post(`/files`, formData);
    fetchTaskDetails();
  } catch (err) {
    console.error(err);
  }
};

  /*  UPDATE FIELD */
  const updateTask = async (field, value) => {
  try {
    await API.put(`/tasks/${taskId}`,
      {
         [field] : value
      }
    );
   

    fetchTaskDetails();   
    onTaskUpdated?.();   
  } catch (err) {
    console.error(err);
  }
};


  /*  COMMENT */
  const postComment = async () => {
    if (!newComment.trim()) return;
    try {
      await API.post(`/comments`,
        {
          taskId ,
          text: newComment,
    });
      
      setNewComment("");
      fetchTaskDetails();
    } catch (err) {
      console.error(err);
    }
  };

  if (!task) return null;

  /*  COLOR HELPERS */
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

  
  return (
    // <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[460px] bg-white shadow-xl overflow-hidden">
<div className="fixed insect-y-0 sm:inset-y-0 sm:right-0 z-40 
  w-full sm:w-[460px] 
  bg-white shadow-xl 
  overflow-y-auto">

  
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        <X />
      </button>

      <div className="p-6 space-y-6">
        {/* title */}
        <div>
          <label className="text-xs text-gray-500">Task Title</label>
          <input
            value={task.title}
            onChange={(e) => updateTask("title", e.target.value)}
            className="w-full text-xl font-semibold outline-none bg-transparent"
          />
        </div>

    
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

        
        {/* DESCRIPTION  */}
<div>
  <label className="text-xs text-gray-500">Description</label>

  <textarea
    rows={4}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    onBlur={saveDescription}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveDescription();
      }
    }}
    placeholder="Add task description..."
    className="
      w-full
      p-3
      rounded-lg
      bg-gray-100
      focus:bg-white
      focus:ring-2
      focus:ring-blue-500
      resize-none
      text-sm
    "
  />
</div>


        {/* TABS  */}
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

        {/*  COMMENTS */}
        
        {activeTab === "comments" && (
  <div className="flex flex-col h-[200px]">

    {/* COMMENTS LIST */}
    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
      {task.comments?.length === 0 && (
        <p className="text-sm text-gray-400">No comments yet</p>
      )}

      {task.comments?.map((c) => (
  <div key={c.id} className="flex items-start justify-between gap-3">

    {/* LEFT ICON */}
    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
      {c.User?.name?.charAt(0)}
    </div>

    {/* COMMENT TEXT */}
    <div className="flex-1">
      <p className="text-sm text-gray-700">{c.text}</p>
    </div>

    {/* DATE */}
    <div className="text-xs text-gray-400 whitespace-nowrap">
      {new Date(c.createdAt).toLocaleString()}
    </div>

  </div>
))}

    </div>

    {/* INPUT — FIXED */}
  
    <div className="flex gap-2 pt-2  sticky bottom-0 bg-white">

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


        {/*ACTIVITY*/}
        

        {activeTab === "activity" && (
  <div className="flex flex-col h-[200px]">

    {/* ACTIVITY LIST  */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
     {task.activities?.length === 0 && (
     <p className="text-sm text-gray-400">No activity yet</p>
      )}
    {task.activities?.map((a) => (
  <div key={a.id} className="flex items-start justify-between gap-3">
<div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
      {a.User?.name?.charAt(0)}
    </div>
    <div className="flex-1 text-sm text-gray-700">
      {a.description}
    </div>

    <div className="text-xs text-gray-400">
      {new Date(a.createdAt).toLocaleString()}
    </div>

  </div>
))}
</div> 
</div>
)}


        {/*  FILES */}
        
        {activeTab === "files" && (
  <div className="flex flex-col h-[200px]">

    {/* UPLOAD — FIXED */}
    <label className="flex items-center gap-2 text-blue-600 cursor-pointer mb-3">
      <Upload size={16} /> Upload File
      <input
        type="file"
        hidden
        onChange={(e) => uploadFile(e.target.files[0])}
      />
    </label>

    {/* FILE LIST — SCROLL */}
    
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">

      {task.files?.length === 0 && (
        <p className="text-sm text-gray-400">No files uploaded</p>
      )}

    
{task.files?.map((f) => (
  <div key={f.id} className="flex items-center justify-between gap-3">

    {/* ICON */}
    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
      p
    </div>

    {/* PREVIEW */}
    <div className="flex-1">
      {f.type?.startsWith("image") ? (
        <img
         src={`${API_URL}/${f.path}`}
              

          alt={f.name}
          className="w-20 h-20 object-cover rounded border"
        />
      ) : (
        <a
           href={`${API_URL}/${f.path}`}
            

          target="_blank"
            

          className="text-sm text-blue-600 hover:underline"
        >
          {f.name}
        </a>
      )}
    </div>

    {/* DATE */}
    <div className="text-xs text-gray-400">
      {new Date(f.createdAt).toLocaleDateString()}
    </div>
  </div>
))}
</div>
</div>
)}

    </div>
    </div>
  );
}



