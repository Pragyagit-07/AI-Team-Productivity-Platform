// import { useEffect, useState } from "react";
// import axios from "axios";
// import TaskDetailSidePanel from "./TaskDetailSidePanel";
// import { Plus, ArrowLeft, ChevronLeft, ChevronDown } from "lucide-react";

// export default function TaskBoard({ projectId, showAll }) {
//   const [tasks, setTasks] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [quickAdd, setQuickAdd] = useState(null);
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const [editingTask, setEditingTask] = useState({});
//   const [collapsed, setCollapsed] = useState({
//     todo: false,
//     inprogress: false,
//     done: false,
//   });

//   const token = localStorage.getItem("token");

//   const toggleColumn = (status) => {
//     setCollapsed((prev) => ({
//       ...prev,
//       [status]: !prev[status],
//     }));
//   };

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const url = showAll
//         ? `${import.meta.env.VITE_API_URL}/tasks/all-project-tasks`
//         : `${import.meta.env.VITE_API_URL}/tasks/project/${projectId}`;

//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);

//       const membersRes = await axios.get(
//         `${import.meta.env.VITE_API_URL}/projects/${projectId}/members`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMembers(membersRes.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [projectId, showAll]);

//   const taskColumns = {
//     todo: tasks.filter((t) => ["todo", "to_do"].includes(t.status)),
//     inprogress: tasks.filter((t) =>
//       ["inprogress", "in_progress"].includes(t.status)
//     ),
//     done: tasks.filter((t) => ["done", "completed"].includes(t.status)),
//   };

//   const onDragStart = (e, task) => {
//     e.dataTransfer.setData("task", JSON.stringify(task));
//   };

//   const onDrop = async (e, newStatus) => {
//     const task = JSON.parse(e.dataTransfer.getData("task"));
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/tasks/${task.id}`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getPriorityColor = (p) =>
//     p === "high"
//       ? "bg-red-200 text-red-800"
//       : p === "medium"
//       ? "bg-yellow-200 text-yellow-800"
//       : "bg-green-200 text-green-800";

//   const getDueDateColor = (dueDate) => {
//     if (!dueDate) return "bg-gray-100 text-gray-600";
//     const today = new Date().toISOString().slice(0, 10);
//     return dueDate < today
//       ? "bg-red-200 text-red-800"
//       : "bg-gray-100 text-gray-600";
//   };

//   const startEditing = (task) => {
//     setEditingTaskId(task.id);
//     setEditingTask({
//       title: task.title,
//       priority: task.priority || "medium",
//       dueDate: task.dueDate || "",
//       assigneeId: task.assignee?.id || "",
//     });
//   };

//   const saveEdit = async (task) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/tasks/${task.id}`,
//         editingTask,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingTaskId(null);
//       setEditingTask({});
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const createQuickTask = async () => {
//     if (!quickAdd.title.trim()) return;
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/tasks`,
//         { ...quickAdd, projectId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setQuickAdd(null);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="relative flex">
//       {/* ================= LEFT : TASK BOARD ================= */}
//       <div className="flex-1">
//         {/* HEADER */}
//         <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-2 ">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
//           >
//             <ArrowLeft size={18} /> Back
//           </button>
//         </div>

//         <div className="flex gap-4 p-4 overflow-x-auto">
//           {["todo", "inprogress", "done"].map((status) => (
//             <div
//               key={status}
//               className="relative flex-1 min-w-[280px] bg-gray-50 rounded-lg p-4 shadow-sm group"
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={(e) => onDrop(e, status)}
//             >
//               {/* COLUMN HEADER */}
//               <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => toggleColumn(status)}
//                     className="text-gray-600 hover:text-gray-900"
//                   >
//                     {collapsed[status] ? (
//                       <ChevronLeft size={18} />
//                     ) : (
//                       <ChevronDown size={18} />
//                     )}
//                   </button>

//                   <h3 className="font-bold text-gray-700">
//                     {status === "todo"
//                       ? "To Do"
//                       : status === "inprogress"
//                       ? "In Progress"
//                       : "Done"}{" "}
//                     ({taskColumns[status].length})
//                   </h3>
//                 </div>

//                 <button
//                   className="opacity-0 group-hover:opacity-100 transition text-gray-600 hover:text-gray-900"
//                   onClick={() =>
//                     setQuickAdd({
//                       title: "",
//                       priority: "medium",
//                       dueDate: "",
//                       assigneeId: "",
//                       status,
//                     })
//                   }
//                 >
//                   <Plus />
//                 </button>
//               </div>

//               {/* QUICK ADD */}
//               {quickAdd?.status === status && (
//                 <div className="bg-white p-3 rounded-lg mb-3 space-y-2 shadow">
//                   <input
//                     type="text"
//                     placeholder="Task title"
//                     className="w-full p-2 rounded"
//                     value={quickAdd.title}
//                     onChange={(e) =>
//                       setQuickAdd({ ...quickAdd, title: e.target.value })
//                     }
//                   />

//                   <select
//                     className="w-full p-2 rounded"
//                     value={quickAdd.priority}
//                     onChange={(e) =>
//                       setQuickAdd({ ...quickAdd, priority: e.target.value })
//                     }
//                   >
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                   </select>

//                   <input
//                     type="date"
//                     className="w-full p-2 rounded"
//                     value={quickAdd.dueDate}
//                     onChange={(e) =>
//                       setQuickAdd({ ...quickAdd, dueDate: e.target.value })
//                     }
//                   />

//                   <select
//                     className="w-full p-2 rounded"
//                     value={quickAdd.assigneeId}
//                     onChange={(e) =>
//                       setQuickAdd({
//                         ...quickAdd,
//                         assigneeId: e.target.value,
//                       })
//                     }
//                   >
//                     <option value="">Select Assignee</option>
//                     {members.map((m) => (
//                       <option key={m.id} value={m.id}>
//                         {m.name}
//                       </option>
//                     ))}
//                   </select>

//                   <div className="flex justify-end gap-2">
//                     <button
//                       className="px-3 py-1 bg-gray-200 rounded"
//                       onClick={() => setQuickAdd(null)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="px-3 py-1 bg-blue-600 text-white rounded"
//                       onClick={createQuickTask}
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* TASK LIST */}
//               {!collapsed[status] && (
//                 <div className="space-y-3">
//                   {taskColumns[status].length === 0 ? (
//                     <div className="text-center text-sm text-gray-400 py-6">
//                       No tasks here
//                     </div>
//                   ) : (
//                     taskColumns[status].map((task) => (
//                       <div
//                         key={task.id}
//                         draggable
//                         onDragStart={(e) => onDragStart(e, task)}
//                         onDoubleClick={() => setSelectedTaskId(task.id)}
//                         className="bg-white p-3 rounded-lg shadow hover:shadow-md cursor-pointer"
//                       >
//                         {editingTaskId === task.id ? (
//                           <input
//                             autoFocus
//                             className="w-full p-1 rounded"
//                             value={editingTask.title}
//                             onChange={(e) =>
//                               setEditingTask({
//                                 ...editingTask,
//                                 title: e.target.value,
//                               })
//                             }
//                             onBlur={() => saveEdit(task)}
//                           />
//                         ) : (
//                           <h4
//                             className="font-medium text-gray-800"
//                             onClick={() => startEditing(task)}
//                           >
//                             {task.title}
//                           </h4>
//                         )}

//                         <div className="flex flex-wrap gap-2 mt-2 text-xs items-center">
//                           <span
//                             className={`px-2 py-1 rounded ${getPriorityColor(
//                               task.priority
//                             )}`}
//                           >
//                             {task.priority?.toUpperCase()}
//                           </span>

//                           <span
//                             className={`px-2 py-1 rounded ${getDueDateColor(
//                               task.dueDate
//                             )}`}
//                           >
//                             {task.dueDate
//                               ? task.dueDate.slice(0, 10)
//                               : "No Due"}
//                           </span>

//                           {task.assignee && (
//                             <div className="flex items-center gap-1 px-2 py-1 rounded bg-blue-100">
//                               <span className="bg-blue-500 w-5 h-5 flex items-center justify-center text-white rounded-full text-[10px]">
//                                 {task.assignee.name
//                                   .charAt(0)
//                                   .toUpperCase()}
//                               </span>
//                               {task.assignee.name}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= RIGHT : SIDE PANEL ================= */}
//       {selectedTaskId && (
//         <TaskDetailSidePanel
//           taskId={selectedTaskId}
//           onClose={() => setSelectedTaskId(null)}
//               onTaskUpdated={fetchTasks}   

//         />
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import API from "../../../api/axios";
import TaskDetailSidePanel from "./TaskDetailSidePanel";
import { Plus, ArrowLeft, ChevronLeft, ChevronDown } from "lucide-react";

export default function TaskBoard({ projectId, showAll }) {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quickAdd, setQuickAdd] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({});
  const [collapsed, setCollapsed] = useState({
    todo: false,
    inprogress: false,
    done: false,
  });

  const toggleColumn = (status) => {
    setCollapsed((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const url = showAll
        ? "/tasks/all-project-tasks"
        : `/tasks/project/${projectId}`;

      const res = await API.get(url);
      setTasks(res.data);

      const membersRes = await API.get(
        `/projects/${projectId}/members`
      );
      setMembers(membersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId, showAll]);

  const taskColumns = {
    todo: tasks.filter((t) => ["todo", "to_do"].includes(t.status)),
    inprogress: tasks.filter((t) =>
      ["inprogress", "in_progress"].includes(t.status)
    ),
    done: tasks.filter((t) => ["done", "completed"].includes(t.status)),
  };

  const onDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const onDrop = async (e, newStatus) => {
    const task = JSON.parse(e.dataTransfer.getData("task"));
    try {
      await API.put(`/tasks/${task.id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const getPriorityColor = (p) =>
    p === "high"
      ? "bg-red-200 text-red-800"
      : p === "medium"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-green-200 text-green-800";

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return "bg-gray-100 text-gray-600";
    const today = new Date().toISOString().slice(0, 10);
    return dueDate < today
      ? "bg-red-200 text-red-800"
      : "bg-gray-100 text-gray-600";
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingTask({
      title: task.title,
      priority: task.priority || "medium",
      dueDate: task.dueDate || "",
      assigneeId: task.assignee?.id || "",
    });
  };

  const saveEdit = async (task) => {
    try {
      await API.put(`/tasks/${task.id}`, editingTask);
      setEditingTaskId(null);
      setEditingTask({});
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const createQuickTask = async () => {
    if (!quickAdd.title.trim()) return;
    try {
      await API.post("/tasks", {
        ...quickAdd,
        projectId,
      });
      setQuickAdd(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="relative flex">
      {/* ================= LEFT : TASK BOARD ================= */}
      <div className="flex-1">
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        <div className="flex gap-4 p-4 overflow-x-auto">
          {["todo", "inprogress", "done"].map((status) => (
            <div
              key={status}
              className="relative flex-1 min-w-[280px] bg-gray-50 rounded-lg p-4 shadow-sm group"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, status)}
            >
              {/* COLUMN HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleColumn(status)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {collapsed[status] ? (
                      <ChevronLeft size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  <h3 className="font-bold text-gray-700">
                    {status === "todo"
                      ? "To Do"
                      : status === "inprogress"
                      ? "In Progress"
                      : "Done"}{" "}
                    ({taskColumns[status].length})
                  </h3>
                </div>

                <button
                  className="opacity-0 group-hover:opacity-100 transition text-gray-600 hover:text-gray-900"
                  onClick={() =>
                    setQuickAdd({
                      title: "",
                      priority: "medium",
                      dueDate: "",
                      assigneeId: "",
                      status,
                    })
                  }
                >
                  <Plus />
                </button>
              </div>

              {/* QUICK ADD */}
              {quickAdd?.status === status && (
                <div className="bg-white p-3 rounded-lg mb-3 space-y-2 shadow">
                  <input
                    type="text"
                    placeholder="Task title"
                    className="w-full p-2 rounded"
                    value={quickAdd.title}
                    onChange={(e) =>
                      setQuickAdd({ ...quickAdd, title: e.target.value })
                    }
                  />

                  <select
                    className="w-full p-2 rounded"
                    value={quickAdd.priority}
                    onChange={(e) =>
                      setQuickAdd({ ...quickAdd, priority: e.target.value })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <input
                    type="date"
                    className="w-full p-2 rounded"
                    value={quickAdd.dueDate}
                    onChange={(e) =>
                      setQuickAdd({ ...quickAdd, dueDate: e.target.value })
                    }
                  />

                  <select
                    className="w-full p-2 rounded"
                    value={quickAdd.assigneeId}
                    onChange={(e) =>
                      setQuickAdd({
                        ...quickAdd,
                        assigneeId: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Assignee</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <div className="flex justify-end gap-2">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded"
                      onClick={() => setQuickAdd(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                      onClick={createQuickTask}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              {/* TASK LIST */}
              {!collapsed[status] && (
                <div className="space-y-3">
                  {taskColumns[status].length === 0 ? (
                    <div className="text-center text-sm text-gray-400 py-6">
                      No tasks here
                    </div>
                  ) : (
                    taskColumns[status].map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, task)}
                        onDoubleClick={() => setSelectedTaskId(task.id)}
                        className="bg-white p-3 rounded-lg shadow hover:shadow-md cursor-pointer"
                      >
                        {editingTaskId === task.id ? (
                          <input
                            autoFocus
                            className="w-full p-1 rounded"
                            value={editingTask.title}
                            onChange={(e) =>
                              setEditingTask({
                                ...editingTask,
                                title: e.target.value,
                              })
                            }
                            onBlur={() => saveEdit(task)}
                          />
                        ) : (
                          <h4
                            className="font-medium text-gray-800"
                            onClick={() => startEditing(task)}
                          >
                            {task.title}
                          </h4>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2 text-xs items-center">
                          <span
                            className={`px-2 py-1 rounded ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority?.toUpperCase()}
                          </span>

                          <span
                            className={`px-2 py-1 rounded ${getDueDateColor(
                              task.dueDate
                            )}`}
                          >
                            {task.dueDate
                              ? task.dueDate.slice(0, 10)
                              : "No Due"}
                          </span>

                          {task.assignee && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded bg-blue-100">
                              <span className="bg-blue-500 w-5 h-5 flex items-center justify-center text-white rounded-full text-[10px]">
                                {task.assignee.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>
                              {task.assignee.name}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT : SIDE PANEL ================= */}
      {selectedTaskId && (
        <TaskDetailSidePanel
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
          onTaskUpdated={fetchTasks}
        />
      )}
    </div>
  );
}
