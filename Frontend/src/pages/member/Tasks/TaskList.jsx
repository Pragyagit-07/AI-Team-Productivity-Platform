// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

// export default function TaskList({ projectId }) {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [searchInput, setSearchInput] = useState("");

//   const [statusFilter, setStatusFilter] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("");
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const pageSize="5";
//   const totalPages = Math.ceil(total / pageSize);

  

//   useEffect(() => {
//     fetchTasks();
//   }, [projectId, page,  statusFilter, priorityFilter]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       let url = `${import.meta.env.VITE_API_URL}/tasks?`;
//       if (projectId) url += `projectId=${projectId}&`;
//       if (search) url += `search=${search}&`;
//       if (statusFilter) url += `status=${statusFilter}&`;
//       if (priorityFilter) url += `priority=${priorityFilter}&`;
//       url += `page=${page}&pageSize=${pageSize}`;

//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       setTasks(res.data.tasks);
//       setTotal(res.data.total);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteTask = async (id) => {
//     if (!confirm("Are you sure you want to delete this task?")) return;
//     try {
//       await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete task");
//     }
//   };

//   const statusColor = (s) =>
//     s === "done"
//       ? "bg-green-100 text-green-800"
//       : s === "inprogress"
//       ? "bg-yellow-100 text-yellow-800"
//       : "bg-gray-200 text-gray-700";

//   const priorityColor = (p) =>
//     p === "high"
//       ? "bg-red-100 text-red-800"
//       : p === "medium"
//       ? "bg-orange-100 text-orange-800"
//       : "bg-blue-100 text-blue-800";

//   if (loading) return <p className="text-center mt-10 text-lg">Loading tasks...</p>;

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-gray-700">Tasks</h2>
//         <div className="flex gap-3 flex-wrap">
          
//           <input
//   type="text"
//   value={searchInput}
//   placeholder="Search tasks..."
//   onChange={(e) => setSearchInput(e.target.value)}
//   onKeyDown={(e) => {
//     if (e.key === "Enter") {
//       setPage(1);              // reset to page 1
//       setSearch(searchInput);  // trigger search
//     }
//   }}
//   className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
// />

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="">All Status</option>
//             <option value="done">Done</option>
//             <option value="inprogress">In Progress</option>
//             <option value="pending">Pending</option>
//           </select>
//           <select
//             value={priorityFilter}
//             onChange={(e) => setPriorityFilter(e.target.value)}
//             className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
//           >
//             <option value="">All Priority</option>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//           {projectId && (
//             <button
//               onClick={() => navigate(`/dashboard/projects/${projectId}/tasks/add`)}
//               className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//             >
//               <Plus size={18} /> Create Task
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left">Task</th>
//               <th className="px-4 py-3 text-center">Project</th>
//               <th className="px-4 py-3 text-center">Status</th>
//               <th className="px-4 py-3 text-center">Priority</th>
//               <th className="px-4 py-3 text-center">Due</th>
//               <th className="px-4 py-3 text-center">Assignee</th>
//               <th className="px-4 py-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center py-6 text-gray-500">
//                   No tasks found.
//                 </td>
//               </tr>
//             )}
//             {tasks.map((task) => (
//               <tr key={task.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3 font-medium text-gray-700">{task.title}</td>
//                 <td className="px-4 py-3 text-center">{task.Project?.name || "-"}</td>
//                 <td className="px-4 py-3 text-center">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(task.status)}`}>
//                     {task.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(task.priority)}`}>
//                     {task.priority}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   {task.assignee ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="h-8 w-8 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold">
//                         {task.assignee.name[0]}
//                       </div>
//                       {task.assignee.name}
//                     </div>
//                   ) : (
//                     <span className="text-gray-400">Unassigned</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   <div className="flex justify-center gap-3">
//                     <Eye
//                       className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
//                       size={18}
//                       onClick={() => navigate(`/dashboard/tasks/view/${task.id}`)}
//                     />
//                     <Pencil
//                       className="text-yellow-600 cursor-pointer hover:scale-110 transition-transform"
//                       size={18}
//                       onClick={() => navigate(`/dashboard/tasks/edit/${task.id}`)}
//                     />
//                     <Trash2
//                       className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
//                       size={18}
//                       onClick={() => deleteTask(task.id)}
//                     />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination - Right aligned */}
      

// <div className="flex justify-end mt-6 gap-4 items-center flex-wrap">
//   <button
//     disabled={page === 1}
//     onClick={() => setPage(page - 1)}
//     className="px-3 py-1 bg-indigo-200 rounded disabled:opacity-50"
//   >
//     Prev
//   </button>

//   <span className="px-3 py-1 bg-white border rounded">
   
//    {page}
//   </span>

//   <button
//     disabled={page === totalPages}
//     onClick={() => setPage(page + 1)}
//     className="px-3 py-1 bg-indigo-200 rounded disabled:opacity-50"
//   >
//     Next
//   </button>
// </div>

//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

export default function TaskList({ projectId }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const pageSize = 5;
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    fetchTasks();
  }, [projectId, page, statusFilter, priorityFilter, search]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let url = `${import.meta.env.VITE_API_URL}/tasks?`;
      if (projectId) url += `projectId=${projectId}&`;
      if (search) url += `search=${search}&`;
      if (statusFilter) url += `status=${statusFilter}&`;
      if (priorityFilter) url += `priority=${priorityFilter}&`;
      url += `page=${page}&pageSize=${pageSize}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data.tasks);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const statusColor = (s) =>
    s === "done"
      ? "bg-green-100 text-green-800"
      : s === "inprogress"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-200 text-gray-700";

  const priorityColor = (p) =>
    p === "high"
      ? "bg-red-100 text-red-800"
      : p === "medium"
      ? "bg-orange-100 text-orange-800"
      : "bg-blue-100 text-blue-800";

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading tasks...</p>;
  }

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-700">Tasks</h2>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <input
            type="text"
            value={searchInput}
            placeholder="Search tasks..."
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setSearch(searchInput);
              }
            }}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="px-3 py-2 rounded-lg border border-gray-300"
          >
            <option value="">All Status</option>
            <option value="done">Done</option>
            <option value="inprogress">In Progress</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPage(1);
              setPriorityFilter(e.target.value);
            }}
            className="px-3 py-2 rounded-lg border border-gray-300"
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {projectId && (
            <button
              onClick={() =>
                navigate(`/dashboard/projects/${projectId}/tasks/add`)
              }
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Plus size={18} /> Create Task
            </button>
          )}
        </div>
      </div>

      {/* Table Wrapper (RESPONSIVE FIX) */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Task</th>
              <th className="px-4 py-3 text-center">Project</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Priority</th>
              <th className="px-4 py-3 text-center">Due</th>
              <th className="px-4 py-3 text-center">Assignee</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}

            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">
                  {task.title}
                </td>
                <td className="px-4 py-3 text-center">
                  {task.Project?.name || "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                {/* <td className="px-4 py-3 text-center">
                  {task.assignee?.name || "Unassigned"}
                </td> */}
                <td className="px-4 py-3 text-center">
               {task.assignee ? (
                   <div className="flex items-center justify-center gap-2">
                       <div className="h-8 w-8 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold">
                         {task.assignee.name[0]}
                       </div>
                       {task.assignee.name}
                     </div>
                   ) : (
                     <span className="text-gray-400">Unassigned</span>
                   )}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <Eye
                      size={18}
                      className="cursor-pointer text-green-600"
                      onClick={() =>
                        navigate(`/dashboard/tasks/view/${task.id}`)
                      }
                    />
                    <Pencil
                      size={18}
                      className="cursor-pointer text-blue-600"
                      onClick={() =>
                        navigate(`/dashboard/tasks/edit/${task.id}`)
                      }
                    />
                    <Trash2
                      size={18}
                      className="cursor-pointer  text-red-600"
                      onClick={() => deleteTask(task.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center md:justify-end mt-6 gap-4 items-center flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-indigo-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1 bg-white border rounded">{page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-indigo-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
